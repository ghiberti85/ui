import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './Table'

function renderTable(props: React.TableHTMLAttributes<HTMLTableElement> = {}) {
  return render(
    <Table {...props}>
      <TableCaption>Invoice list</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$100</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>$100</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  )
}

describe('Table', () => {
  it('renders a complete table with header, body, footer, and caption', () => {
    renderTable()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Invoice list')).toBeInTheDocument()
    expect(screen.getByText('Invoice')).toBeInTheDocument()
    expect(screen.getByText('INV-001')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('renders TableHead as th elements', () => {
    renderTable()
    const ths = document.querySelectorAll('th')
    expect(ths.length).toBeGreaterThan(0)
    expect(ths[0].textContent).toBe('Invoice')
  })

  it('renders TableCell as td elements', () => {
    renderTable()
    const tds = document.querySelectorAll('td')
    expect(tds.length).toBeGreaterThan(0)
    expect(tds[0].textContent).toBe('INV-001')
  })

  it('renders TableCaption with the correct text', () => {
    renderTable()
    const caption = document.querySelector('caption')
    expect(caption).toBeInTheDocument()
    expect(caption?.textContent).toBe('Invoice list')
  })

  it('TableRow without striped prop does not have striped class', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>row</td>
          </TableRow>
        </tbody>
      </table>,
    )
    const row = screen.getByRole('row')
    expect(row.className).not.toMatch(/rowStriped/i)
  })

  it('TableRow with striped prop applies striped class', () => {
    render(
      <table>
        <tbody>
          <TableRow striped>
            <td>striped row</td>
          </TableRow>
        </tbody>
      </table>,
    )
    const row = screen.getByRole('row')
    expect(row.className).toMatch(/rowStriped/i)
  })

  it('Table accepts and applies additional className', () => {
    renderTable({ className: 'my-table' })
    const table = screen.getByRole('table')
    expect(table.className).toContain('my-table')
  })

  it('TableHeader accepts className', () => {
    render(
      <table>
        <TableHeader className="my-thead">
          <tr>
            <th>H</th>
          </tr>
        </TableHeader>
      </table>,
    )
    expect(document.querySelector('thead')?.className).toContain('my-thead')
  })

  it('TableBody accepts className', () => {
    render(
      <table>
        <TableBody className="my-tbody">
          <tr>
            <td>B</td>
          </tr>
        </TableBody>
      </table>,
    )
    expect(document.querySelector('tbody')?.className).toContain('my-tbody')
  })

  it('TableFooter accepts className', () => {
    render(
      <table>
        <TableFooter className="my-tfoot">
          <tr>
            <td>F</td>
          </tr>
        </TableFooter>
      </table>,
    )
    expect(document.querySelector('tfoot')?.className).toContain('my-tfoot')
  })

  it('TableRow accepts className', () => {
    render(
      <table>
        <tbody>
          <TableRow className="my-row">
            <td>R</td>
          </TableRow>
        </tbody>
      </table>,
    )
    expect(screen.getByRole('row').className).toContain('my-row')
  })

  it('TableHead accepts className', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead className="my-th">H</TableHead>
          </tr>
        </thead>
      </table>,
    )
    expect(document.querySelector('th')?.className).toContain('my-th')
  })

  it('TableCell accepts className', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell className="my-td">C</TableCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(document.querySelector('td')?.className).toContain('my-td')
  })

  it('TableCaption accepts className', () => {
    render(
      <table>
        <TableCaption className="my-caption">Cap</TableCaption>
        <tbody>
          <tr>
            <td>x</td>
          </tr>
        </tbody>
      </table>,
    )
    expect(document.querySelector('caption')?.className).toContain('my-caption')
  })

  it('forwards ref to the table element', () => {
    const ref = { current: null as HTMLTableElement | null }
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('TABLE')
  })
})

describe('Table accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = renderTable()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
