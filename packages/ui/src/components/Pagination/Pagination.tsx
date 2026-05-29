import { cn } from '../../utils/cn'
import styles from './Pagination.module.css'

export interface PaginationProps {
  /** Current page (1-based) */
  page: number
  /** Total number of pages */
  totalPages: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Number of sibling pages around current page */
  siblingCount?: number
  /** Show first and last page buttons */
  showFirstLast?: boolean
  /** Additional className */
  className?: string
}

function getRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function buildPages(page: number, totalPages: number, siblingCount: number): (number | '...')[] {
  const totalPageNumbers = siblingCount * 2 + 5 // siblings + current + 2 boundaries + 2 ellipsis

  if (totalPages <= totalPageNumbers) {
    return getRange(1, totalPages)
  }

  const leftSibling = Math.max(page - siblingCount, 1)
  const rightSibling = Math.min(page + siblingCount, totalPages)

  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPages - 1

  const firstPage = 1
  const lastPage = totalPages

  if (!showLeftDots && showRightDots) {
    const leftRange = getRange(1, 3 + 2 * siblingCount)
    return [...leftRange, '...', lastPage]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = getRange(totalPages - (3 + 2 * siblingCount) + 1, totalPages)
    return [firstPage, '...', ...rightRange]
  }

  const middleRange = getRange(leftSibling, rightSibling)
  return [firstPage, '...', ...middleRange, '...', lastPage]
}

/**
 * Pagination — pure semantic HTML with ellipsis support.
 *
 * @example
 * <Pagination page={1} totalPages={10} onPageChange={setPage} />
 */
export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  className,
}: PaginationProps) => {
  const pages = buildPages(page, totalPages, siblingCount)

  return (
    <nav aria-label="Pagination" className={cn(styles.nav, className)}>
      <ul className={styles.list}>
        {showFirstLast && (
          <li>
            <button
              className={cn(styles.button, styles.control)}
              onClick={() => onPageChange(1)}
              disabled={page === 1}
              aria-label="First page"
            >
              «
            </button>
          </li>
        )}
        <li>
          <button
            className={cn(styles.button, styles.control)}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>
        {pages.map((p, i) =>
          p === '...' ? (
            <li key={`ellipsis-${i}`} aria-hidden="true">
              <span className={styles.ellipsis}>…</span>
            </li>
          ) : (
            <li key={p}>
              <button
                className={cn(styles.button, p === page && styles.buttonActive)}
                onClick={() => onPageChange(p as number)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
        <li>
          <button
            className={cn(styles.button, styles.control)}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
        {showFirstLast && (
          <li>
            <button
              className={cn(styles.button, styles.control)}
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
              aria-label="Last page"
            >
              »
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
