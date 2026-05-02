Perfect. Let me show you how to integrate hybrid search and keyword suggestions specifically for your careers and properties search.

## 1. Database Schema for Hybrid Search + Autocomplete

First, let's design a comprehensive schema that supports both hybrid search and keyword suggestions:

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;     -- For fuzzy/trigram search
CREATE EXTENSION IF NOT EXISTS vector;      -- For embeddings (pgvector)
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch; -- For Levenshtein distance

-- =====================================================
-- CAREERS TABLE
-- =====================================================
CREATE TABLE careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Open',
    date_posted TIMESTAMPTZ DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    
    -- Full-text search vector (weighted fields)
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', COALESCE(job_title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(company_name, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(location, '')), 'C') ||
        setweight(to_tsvector('english', COALESCE(description, '')), 'D')
    ) STORED,
    
    -- Vector embedding for semantic search (1536-dim for OpenAI)
    embedding VECTOR(1536)
);

-- Indexes for hybrid search
CREATE INDEX careers_search_vector_idx ON careers USING GIN (search_vector);
CREATE INDEX careers_embedding_idx ON careers USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX careers_job_title_trgm_idx ON careers USING GIN (job_title gin_trgm_ops);
CREATE INDEX careers_popularity_idx ON careers (view_count DESC, click_count DESC);

-- =====================================================
-- KEYWORD SUGGESTIONS TABLE (for autocomplete)
-- =====================================================
CREATE TABLE keyword_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'careers' or 'properties'
    popularity_score INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    last_used TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast prefix matching
CREATE INDEX keyword_suggestions_prefix_idx ON keyword_suggestions (keyword text_pattern_ops);
CREATE INDEX keyword_suggestions_category_idx ON keyword_suggestions (category);
CREATE INDEX keyword_suggestions_popularity_idx ON keyword_suggestions (popularity_score DESC);
```

## 2. Hybrid Search Service with RRF

```typescript
// app/services/hybrid-search.service.ts
import { openai } from '@/lib/openai';
import { db } from '@/lib/db';

interface SearchResult<T> {
  id: string;
  data: T;
  score: number;
  matchType: 'semantic' | 'keyword' | 'both';
}

interface HybridSearchOptions {
  alpha?: number;        // 0 = pure keyword, 1 = pure semantic
  limit?: number;
  threshold?: number;
  includeScore?: boolean;
}

class HybridSearchService {
  private readonly RRF_CONSTANT = 60; // Smoothing constant for RRF

  /**
   * Generate embedding for semantic search
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  }

  /**
   * Reciprocal Rank Fusion (RRF) - combines rankings from multiple search methods
   * Formula: score = sum(1 / (k + rank)) for each ranker
   */
  private rrfScore(ranks: { keyword?: number; semantic?: number }): number {
    let score = 0;
    if (ranks.keyword !== undefined) {
      score += 1 / (this.RRF_CONSTANT + ranks.keyword);
    }
    if (ranks.semantic !== undefined) {
      score += 1 / (this.RRF_CONSTANT + ranks.semantic);
    }
    return score;
  }

  /**
   * Hybrid search for careers
   */
  async searchCareers(
    query: string,
    options: HybridSearchOptions = {}
  ): Promise<SearchResult<any>[]> {
    const { alpha = 0.5, limit = 20, threshold = 0.3 } = options;

    // Generate embedding for semantic search
    const embedding = await this.generateEmbedding(query);
    const embeddingString = `[${embedding.join(',')}]`;

    // Run hybrid search using CTE with RRF
    const results = await db.$queryRaw`
      WITH 
      -- Keyword search with full-text ranking
      keyword_search AS (
        SELECT 
          id,
          job_title,
          company_name,
          location,
          employment_type,
          description,
          status,
          date_posted,
          ROW_NUMBER() OVER (
            ORDER BY ts_rank(search_vector, websearch_to_tsquery('english', ${query})) DESC
          ) AS rank
        FROM careers
        WHERE search_vector @@ websearch_to_tsquery('english', ${query})
          OR job_title % ${query}  -- Trigram fuzzy matching
        LIMIT ${limit * 2}
      ),
      
      -- Semantic search with vector similarity
      semantic_search AS (
        SELECT 
          id,
          job_title,
          company_name,
          location,
          employment_type,
          description,
          status,
          date_posted,
          ROW_NUMBER() OVER (
            ORDER BY embedding <=> ${embeddingString}::vector
          ) AS rank,
          1 - (embedding <=> ${embeddingString}::vector) AS similarity
        FROM careers
        WHERE embedding IS NOT NULL
          AND (1 - (embedding <=> ${embeddingString}::vector)) > ${threshold}
        LIMIT ${limit * 2}
      ),
      
      -- Combine with RRF scoring
      combined AS (
        SELECT 
          COALESCE(k.id, s.id) AS id,
          COALESCE(k.job_title, s.job_title) AS job_title,
          COALESCE(k.company_name, s.company_name) AS company_name,
          COALESCE(k.location, s.location) AS location,
          COALESCE(k.employment_type, s.employment_type) AS employment_type,
          COALESCE(k.description, s.description) AS description,
          COALESCE(k.status, s.status) AS status,
          COALESCE(k.date_posted, s.date_posted) AS date_posted,
          -- Weighted RRF score based on alpha parameter
          (
            COALESCE(1.0 / (${this.RRF_CONSTANT} + k.rank), 0.0) * (1 - ${alpha}) +
            COALESCE(1.0 / (${this.RRF_CONSTANT} + s.rank), 0.0) * ${alpha}
          ) AS score,
          CASE 
            WHEN k.id IS NOT NULL AND s.id IS NOT NULL THEN 'both'
            WHEN k.id IS NOT NULL THEN 'keyword'
            ELSE 'semantic'
          END AS match_type
        FROM keyword_search k
        FULL OUTER JOIN semantic_search s ON k.id = s.id
      )
      SELECT * FROM combined
      WHERE score > 0
      ORDER BY score DESC
      LIMIT ${limit}
    `;

    return results as SearchResult<any>[];
  }

  /**
   * Record user click for popularity-based ranking
   * This makes suggestions smarter over time 
   */
  async recordClick(careerId: string): Promise<void> {
    await db.$executeRaw`
      UPDATE careers 
      SET click_count = click_count + 1 
      WHERE id = ${careerId}::uuid
    `;
  }
}

export const hybridSearchService = new HybridSearchService();
```

## 3. Keyword Suggestions (Autocomplete) Service

```typescript
// app/services/autocomplete.service.ts

interface SuggestionResult {
  keyword: string;
  score: number;
  category: string;
  matchedOn: 'prefix' | 'fuzzy' | 'popular';
}

class AutocompleteService {
  /**
   * Get keyword suggestions with popularity ranking
   * This combines prefix matching + fuzzy matching + popularity scoring 
   */
  async getSuggestions(
    query: string,
    category: 'careers' | 'properties',
    limit: number = 10
  ): Promise<SuggestionResult[]> {
    if (!query || query.length < 2) {
      // Return popular searches when query is empty 
      return this.getPopularSuggestions(category, limit);
    }

    const results = await db.$queryRaw`
      WITH 
      -- Prefix matches (highest priority)
      prefix_matches AS (
        SELECT 
          keyword,
          category,
          popularity_score,
          click_count,
          1.0 AS match_priority,
          -- Score formula combines popularity and recency
          (
            popularity_score * 0.7 + 
            click_count * 0.3
          ) AS final_score
        FROM keyword_suggestions
        WHERE category = ${category}
          AND keyword ILIKE ${query + '%'}
        LIMIT ${limit * 2}
      ),
      
      -- Fuzzy/trigram matches (fallback)
      fuzzy_matches AS (
        SELECT 
          keyword,
          category,
          popularity_score,
          click_count,
          similarity(keyword, ${query}) AS match_priority,
          (
            popularity_score * 0.5 + 
            click_count * 0.3 +
            similarity(keyword, ${query}) * 0.2
          ) AS final_score
        FROM keyword_suggestions
        WHERE category = ${category}
          AND keyword % ${query}  -- Trigram similarity
          AND keyword NOT IN (SELECT keyword FROM prefix_matches)
        ORDER BY similarity(keyword, ${query}) DESC
        LIMIT ${limit}
      ),
      
      -- Combine results
      combined AS (
        SELECT * FROM prefix_matches
        UNION ALL
        SELECT * FROM fuzzy_matches
      )
      SELECT 
        keyword,
        category,
        final_score AS score,
        CASE 
          WHEN match_priority = 1.0 THEN 'prefix'
          WHEN match_priority >= 0.3 THEN 'fuzzy'
          ELSE 'popular'
        END AS matched_on
      FROM combined
      ORDER BY final_score DESC
      LIMIT ${limit}
    `;

    return results as SuggestionResult[];
  }

  /**
   * Get popular suggestions when query is empty
   */
  private async getPopularSuggestions(
    category: string,
    limit: number
  ): Promise<SuggestionResult[]> {
    return db.$queryRaw`
      SELECT 
        keyword,
        category,
        popularity_score AS score,
        'popular' AS matched_on
      FROM keyword_suggestions
      WHERE category = ${category}
      ORDER BY popularity_score DESC, last_used DESC
      LIMIT ${limit}
    `;
  }

  /**
   * Update suggestion popularity when user selects a suggestion
   */
  async recordSuggestionClick(keyword: string, category: string): Promise<void> {
    await db.$executeRaw`
      INSERT INTO keyword_suggestions (keyword, category, popularity_score, click_count, last_used)
      VALUES (${keyword}, ${category}, 1, 1, NOW())
      ON CONFLICT (keyword) DO UPDATE SET
        popularity_score = keyword_suggestions.popularity_score + 1,
        click_count = keyword_suggestions.click_count + 1,
        last_used = NOW()
    `;
  }

  /**
   * Build suggestion index from existing data
   * This creates the vocabulary from your actual content 
   */
  async buildSuggestionIndex(): Promise<void> {
    // Extract keywords from careers
    await db.$executeRaw`
      INSERT INTO keyword_suggestions (keyword, category, popularity_score)
      SELECT 
        DISTINCT LOWER(unnest(string_to_array(job_title, ' '))) AS keyword,
        'careers' AS category,
        COUNT(*) AS popularity_score
      FROM careers
      WHERE LENGTH(unnest(string_to_array(job_title, ' '))) > 2
      GROUP BY keyword
      ON CONFLICT (keyword) DO UPDATE SET
        popularity_score = keyword_suggestions.popularity_score + EXCLUDED.popularity_score
    `;

    // Add location-based suggestions
    await db.$executeRaw`
      INSERT INTO keyword_suggestions (keyword, category, popularity_score)
      SELECT 
        DISTINCT LOWER(location) AS keyword,
        'careers' AS category,
        COUNT(*) AS popularity_score
      FROM careers
      WHERE LENGTH(location) > 2
      GROUP BY keyword
      ON CONFLICT (keyword) DO UPDATE SET
        popularity_score = keyword_suggestions.popularity_score + EXCLUDED.popularity_score
    `;
  }
}

export const autocompleteService = new AutocompleteService();
```

## 4. Combined Search API Route

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hybridSearchService } from '@/app/services/hybrid-search.service';
import { autocompleteService } from '@/app/services/autocomplete.service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') as 'careers' | 'properties' | 'suggestions';
  const limit = parseInt(searchParams.get('limit') || '10');
  const alpha = parseFloat(searchParams.get('alpha') || '0.5');

  try {
    // Return keyword suggestions for autocomplete 
    if (type === 'suggestions') {
      const suggestions = await autocompleteService.getSuggestions(
        query,
        'careers',
        limit
      );
      return NextResponse.json({ suggestions });
    }

    // Hybrid search for actual results
    const results = await hybridSearchService.searchCareers(query, {
      alpha,
      limit,
      threshold: 0.3,
    });

    return NextResponse.json({ results, query });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

// Track clicks to improve suggestions over time
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, id, keyword } = body;

  if (type === 'suggestion-click' && keyword) {
    await autocompleteService.recordSuggestionClick(keyword, 'careers');
  }

  if (type === 'result-click' && id) {
    await hybridSearchService.recordClick(id);
  }

  return NextResponse.json({ success: true });
}
```

## 5. Search Input Component with Suggestions

```tsx
// app/component/ui/SmartSearchInput.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Loader2, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/app/component/ui';
import { cn } from '@/app/lib/utils';
import { useDebounce } from '@/app/hooks/useDebounce';
import Link from 'next/link';

interface Suggestion {
  keyword: string;
  score: number;
  matchedOn: 'prefix' | 'fuzzy' | 'popular';
}

interface SmartSearchInputProps {
  type: 'careers' | 'properties';
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function SmartSearchInput({
  type,
  placeholder = 'Search...',
  className,
  onSearch,
}: SmartSearchInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 150); // Faster than regular search for suggestions 

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        // Show popular suggestions when query is empty 
        if (debouncedQuery.length === 0 && isFocused) {
          setIsLoading(true);
          const res = await fetch(`/api/search?type=suggestions&q=&limit=5`);
          const data = await res.json();
          setSuggestions(data.suggestions);
          setIsLoading(false);
        } else {
          setSuggestions([]);
        }
        return;
      }

      setIsLoading(true);
      const res = await fetch(`/api/search?type=suggestions&q=${encodeURIComponent(debouncedQuery)}`);
      const data = await res.json();
      setSuggestions(data.suggestions);
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [debouncedQuery, isFocused]);

  const handleSelect = useCallback(async (suggestion: Suggestion) => {
    setQuery(suggestion.keyword);
    setSuggestions([]);
    setIsFocused(false);
    
    // Record click for popularity ranking
    await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'suggestion-click', keyword: suggestion.keyword }),
    });
    
    onSearch?.(suggestion.keyword);
  }, [onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const getMatchedIcon = (matchedOn: string) => {
    switch (matchedOn) {
      case 'popular':
        return <TrendingUp className="w-4 h-4 text-orange-400" />;
      case 'prefix':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10"
          role="combobox"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
        
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        )}
        
        {!isLoading && query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div 
          id="search-suggestions"
          className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-[#525252] rounded-lg shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.keyword}
              onClick={() => handleSelect(suggestion)}
              className={cn(
                'w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors',
                'hover:bg-white/10',
                index === selectedIndex && 'bg-white/10'
              )}
            >
              {getMatchedIcon(suggestion.matchedOn)}
              <span className="text-white flex-1">{suggestion.keyword}</span>
              {suggestion.matchedOn === 'popular' && (
                <span className="text-xs text-gray-400">Popular</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Key Features Summary

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Prefix Matching** | `ILIKE query%` | Instant results as user types |
| **Fuzzy Matching** | Trigram (`%`) + Levenshtein | Handles typos like "desiner" → "designer"  |
| **Popularity Ranking** | Click tracking + score increment | Gets smarter over time  |
| **Hybrid Search** | RRF combining keyword + semantic | Balances precision and recall |
| **Empty Query Suggestions** | Popular searches shown | Helps users discover content  |
| **Keyboard Navigation** | Arrow keys + Enter | Accessibility and power-user friendly |

The system learns from user behavior: each click on a suggestion increments its popularity score, so commonly-selected terms naturally rise to the top over time .