import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Avatar.module.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source URL */
  src?: string
  /** Alt text for the image; also used to auto-generate initials if fallback is not provided */
  alt?: string
  /** Initials to display when no image is available (e.g. "FG") */
  fallback?: string
  /** Size of the avatar */
  size?: AvatarSize
  /** Shape of the avatar */
  shape?: AvatarShape
}

/**
 * Generates 1–2 initials from a display name string.
 * "Fernando Ghiberti" → "FG", "Alice" → "A"
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? ''
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Avatar component — displays a user's profile image or their initials as a fallback.
 *
 * - If `src` is provided the image is rendered.
 * - If the image fails to load, falls back to initials.
 * - If no `src`, shows `fallback` initials immediately.
 * - If neither `fallback` nor a failed image, auto-generates initials from `alt`.
 *
 * @example
 * <Avatar src="/photo.jpg" alt="Fernando Ghiberti" size="md" shape="circle" />
 * <Avatar fallback="FG" size="lg" />
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      shape = 'circle',
      className,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false)

    // Reset error state when src changes
    React.useEffect(() => {
      setImgError(false)
    }, [src])

    const showImage = Boolean(src) && !imgError
    const initials = fallback ?? (alt ? getInitials(alt) : '')

    return (
      <span
        ref={ref}
        className={cn(
          styles.avatar,
          styles[`size-${size}`],
          styles[`shape-${shape}`],
          className
        )}
        aria-label={!showImage ? alt || undefined : undefined}
        role={!showImage ? 'img' : undefined}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
        )}
      </span>
    )
  }
)

Avatar.displayName = 'Avatar'
