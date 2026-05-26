import styles from './PropsTable.module.css'

export interface PropRow {
  prop: string
  type: string
  defaultValue: string
  description: string
}

interface PropsTableProps {
  rows: PropRow[]
  headings: {
    prop: string
    type: string
    default: string
    description: string
  }
}

export function PropsTable({ rows, headings }: PropsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>{headings.prop}</th>
            <th className={styles.th}>{headings.type}</th>
            <th className={styles.th}>{headings.default}</th>
            <th className={styles.th}>{headings.description}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={styles.tr}>
              <td className={styles.tdProp}>
                <code className={styles.code}>{row.prop}</code>
              </td>
              <td className={styles.tdType}>
                <code className={styles.code}>{row.type}</code>
              </td>
              <td className={styles.tdDefault}>
                <code className={styles.code}>{row.defaultValue}</code>
              </td>
              <td className={styles.tdDesc}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
