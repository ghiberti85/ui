import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Timeline.module.css'

export type TimelineVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface TimelineItemData {
  id?: string
  title: React.ReactNode
  description?: React.ReactNode
  date?: React.ReactNode
  icon?: React.ReactNode
  variant?: TimelineVariant
}

export interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItemData[]
  /** Additional className */
  className?: string
}

export interface TimelineItemProps {
  title: React.ReactNode
  description?: React.ReactNode
  date?: React.ReactNode
  icon?: React.ReactNode
  variant?: TimelineVariant
  isLast?: boolean
  className?: string
}

/**
 * TimelineItem — single event in a Timeline.
 */
export function TimelineItem({
  title,
  description,
  date,
  icon,
  variant = 'default',
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <li className={cn(styles.item, className)}>
      <div className={styles.leftCol}>
        <div className={cn(styles.dot, styles[variant])}>
          {icon ? <span className={styles.dotIcon}>{icon}</span> : null}
        </div>
        {!isLast && <div className={styles.line} aria-hidden="true" />}
      </div>
      <div className={styles.content}>
        {date && <time className={styles.date}>{date}</time>}
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </li>
  )
}

TimelineItem.displayName = 'TimelineItem'

/**
 * Timeline — vertical list of chronological events.
 *
 * @example
 * <Timeline items={[
 *   { title: 'Project started', date: 'Jan 2024', variant: 'success' },
 *   { title: 'Beta launched', date: 'Mar 2024' },
 * ]} />
 */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn(styles.timeline, className)} aria-label="Timeline">
      {items.map((item, index) => (
        <TimelineItem
          key={item.id ?? index}
          title={item.title}
          description={item.description}
          date={item.date}
          icon={item.icon}
          variant={item.variant}
          isLast={index === items.length - 1}
        />
      ))}
    </ol>
  )
}

Timeline.displayName = 'Timeline'
