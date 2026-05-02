// app/unauthorized/page.tsx
'use client';

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-danger" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
        
        <p className="text-muted">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}