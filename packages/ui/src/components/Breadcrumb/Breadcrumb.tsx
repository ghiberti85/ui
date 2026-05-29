import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Breadcrumb.module.css'

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Breadcrumb navigation — pure semantic HTML, no external deps.
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn(styles.nav, className)} {...props} />
  )
)
Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn(styles.list, className)} {...props} />
))
BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(styles.item, className)} {...props} />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as a custom element */
  asChild?: boolean
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn(styles.link, className)} {...props} />
  )
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current="page"
    className={cn(styles.page, className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Custom separator content */
  children?: React.ReactNode
}

export const BreadcrumbSeparator = ({ className, children, ...props }: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(styles.separator, className)}
    {...props}
  >
    {children ?? <span aria-hidden="true">/</span>}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(styles.ellipsis, className)}
    {...props}
  >
    …
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'
