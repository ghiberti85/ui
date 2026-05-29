import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Skeleton.module.css'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (CSS value) */
  width?: string | number
  /** Height of the skeleton (CSS value) */
  height?: string | number
  /** Border radius (CSS value) */
  borderRadius?: string | number
}

/**
 * Skeleton component — placeholder loading animation.
 * Pure CSS shimmer animation consuming design system tokens.
 *
 * @example
 * <Skeleton width="200px" height="20px" />
 * <SkeletonText lines={3} />
 * <SkeletonAvatar size={40} />
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, borderRadius, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.skeleton, className)}
        style={{
          width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
          borderRadius: borderRadius !== undefined ? (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius) : undefined,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export interface SkeletonTextProps {
  /** Number of text lines */
  lines?: number
  /** Override last line width */
  lastLineWidth?: string
  className?: string
}

/**
 * SkeletonText — multi-line text placeholder.
 *
 * @example
 * <SkeletonText lines={3} />
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '60%',
  className,
}) => {
  return (
    <div className={cn(styles.textGroup, className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height="1em"
          width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'}
          className={styles.textLine}
        />
      ))}
    </div>
  )
}

export interface SkeletonAvatarProps {
  /** Diameter in pixels */
  size?: number
  /** Shape */
  shape?: 'circle' | 'square'
  className?: string
}

/**
 * SkeletonAvatar — circular or square avatar placeholder.
 *
 * @example
 * <SkeletonAvatar size={40} />
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 40,
  shape = 'circle',
  className,
}) => {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={shape === 'circle' ? '50%' : undefined}
      className={className}
    />
  )
}
