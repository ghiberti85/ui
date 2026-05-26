/**
 * Utility for merging class names conditionally.
 * Lightweight alternative to clsx + tailwind-merge for CSS Modules usage.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
