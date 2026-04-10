'use client'

import React, { ReactNode } from 'react'
import { Breadcrumbs, Breadcrumbs as BreadcrumbsComponent } from '@heroui/react'
import { ChevronRight } from 'lucide-react'
import { 
  breadcrumbsVariants, 
  breadcrumbItemVariants,
  breadcrumbIconVariants,
  breadcrumbSeparatorVariants,
  type BreadcrumbsVariantsProps 
} from './variants'

export type BreadcrumbItemType = {
  /**
   * Display text for the breadcrumb item
   */
  label: string
  /**
   * Navigation URL
   */
  href?: string
  /**
   * Optional icon to display before the label
   */
  icon?: ReactNode
  /**
   * Whether this is the current page
   */
  isCurrent?: boolean
  /**
   * Whether this item is disabled
   */
  isDisabled?: boolean
}

interface BreadcrumbsProps extends BreadcrumbsVariantsProps {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItemType[]
  /**
   * Custom separator between items
   * @default ChevronRight icon
   */
  separator?: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Breadcrumbs Navigation Component
 * 
 * Displays the current page's location within a hierarchy using HeroUI v3.
 * Uses theme colors from global.css for consistent styling:
 * - Current item: foreground color (oklch(21.03% 0.0015 145.09))
 * - Normal item: muted color (oklch(55.17% 0.0030 145.09))
 * - Hover: accent color (oklch(62.04% 0.1950 145.09))
 * 
 * @example
 * <BreadcrumbsComp
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics', isCurrent: true }
 *   ]}
 * />
 * 
 * @example
 * // With icons
 * <BreadcrumbsComp
 *   items={[
 *     { label: 'Home', href: '/', icon: <Home size={16} /> },
 *     { label: 'Products', href: '/products', icon: <Package size={16} /> },
 *     { label: 'Electronics', isCurrent: true, icon: <Zap size={16} /> }
 *   ]}
 * />
 * 
 * @example
 * <BreadcrumbsComp
 *   items={items}
 *   size="lg"
 *   separator={<Slash size={20} />}
 * />
 */
export default function BreadcrumbsComp({
  items,
  separator,
  size = 'md',
  className
}: BreadcrumbsProps) {
  const containerClasses = breadcrumbsVariants({ size, className })
  const defaultSeparator = separator || <ChevronRight size={16} />

  return (
    <Breadcrumbs
      className={containerClasses}
      separator={defaultSeparator}
    >
      {items.map((item) => (
        <BreadcrumbsComponent.Item
          key={item.label}
          href={item.href}
          className={breadcrumbItemVariants({
            isCurrent: item.isCurrent,
            isDisabled: item.isDisabled
          })}
          isDisabled={item.isDisabled}
        >
          {item.icon && (
            <span className={`${breadcrumbIconVariants({ size })}`}>
              {item.icon}
            </span>
          )}
          {item.label}
        </BreadcrumbsComponent.Item>
      ))}
    </Breadcrumbs>
  )
}
