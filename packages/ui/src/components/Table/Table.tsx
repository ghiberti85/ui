import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Table.module.css'

/* ─── Root ─────────────────────────────────────────────────────────────────── */

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

/**
 * Table root — horizontally scrollable wrapper + semantic `<table>`.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className={styles.wrapper}>
      <table ref={ref} className={cn(styles.table, className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

/* ─── Header ────────────────────────────────────────────────────────────────── */

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn(styles.header, className)} {...props} />
  ),
)
TableHeader.displayName = 'TableHeader'

/* ─── Body ──────────────────────────────────────────────────────────────────── */

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(styles.body, className)} {...props} />
  ),
)
TableBody.displayName = 'TableBody'

/* ─── Footer ────────────────────────────────────────────────────────────────── */

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn(styles.footer, className)} {...props} />
  ),
)
TableFooter.displayName = 'TableFooter'

/* ─── Row ───────────────────────────────────────────────────────────────────── */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Applies alternate row shading for striped tables */
  striped?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, striped, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(styles.row, striped && styles.rowStriped, className)}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

/* ─── Head cell (th) ────────────────────────────────────────────────────────── */

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn(styles.head, className)} {...props} />
  ),
)
TableHead.displayName = 'TableHead'

/* ─── Data cell (td) ────────────────────────────────────────────────────────── */

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn(styles.cell, className)} {...props} />
  ),
)
TableCell.displayName = 'TableCell'

/* ─── Caption ───────────────────────────────────────────────────────────────── */

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn(styles.caption, className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'
