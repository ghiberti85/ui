import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

function DefaultDemo() {
  const [page, setPage] = React.useState(1)
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />
}

function MiddlePageDemo() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />
}

function ManyPagesDemo() {
  const [page, setPage] = React.useState(10)
  return <Pagination page={page} totalPages={50} onPageChange={setPage} siblingCount={1} />
}

function WithFirstLastDemo() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={20} onPageChange={setPage} showFirstLast />
}

function FewPagesDemo() {
  const [page, setPage] = React.useState(1)
  return <Pagination page={page} totalPages={3} onPageChange={setPage} />
}

export const Default: StoryObj<typeof Pagination> = {
  render: () => <DefaultDemo />,
}

export const MiddlePage: StoryObj<typeof Pagination> = {
  render: () => <MiddlePageDemo />,
}

export const ManyPages: StoryObj<typeof Pagination> = {
  render: () => <ManyPagesDemo />,
}

export const WithFirstLast: StoryObj<typeof Pagination> = {
  render: () => <WithFirstLastDemo />,
}

export const FewPages: StoryObj<typeof Pagination> = {
  render: () => <FewPagesDemo />,
}
