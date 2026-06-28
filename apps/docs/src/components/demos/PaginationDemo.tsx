'use client'
import * as React from 'react'
import { Pagination } from '@ghiberti85/ui'

export function PaginationDemo() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={20} onPageChange={setPage} />
}

export function PaginationWithFirstLastDemo() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={20} onPageChange={setPage} showFirstLast />
}
