'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import styles from './ComponentsLayout.module.css'

const COMPONENT_SLUGS = [
  'button', 'badge', 'input', 'textarea', 'select',
  'checkbox', 'radio', 'switch', 'card', 'dialog',
  'tooltip', 'avatar', 'separator', 'typography', 'stack', 'container',
  'tabs', 'accordion', 'toast', 'table',
]

const COMPONENT_LABELS: Record<string, string> = {
  button: 'Button', badge: 'Badge', input: 'Input', textarea: 'Textarea',
  select: 'Select', checkbox: 'Checkbox', radio: 'Radio', switch: 'Switch',
  card: 'Card', dialog: 'Dialog', tooltip: 'Tooltip', avatar: 'Avatar',
  separator: 'Separator', typography: 'Typography', stack: 'Stack', container: 'Container',
  tabs: 'Tabs', accordion: 'Accordion', toast: 'Toast', table: 'Table',
}

function getCurrentSlug(pathname: string): string | null {
  const match = pathname.match(/\/components\/([^/]+)/)
  return match ? match[1] : null
}

export default function ComponentsLayout({
  children,
  sidebarLabel,
}: {
  children: React.ReactNode
  sidebarLabel: string
}) {
  const pathname = usePathname()
  const t = useTranslations('sidebar')
  const currentSlug = getCurrentSlug(pathname)
  const currentIndex = currentSlug ? COMPONENT_SLUGS.indexOf(currentSlug) : -1
  const prevSlug = currentIndex > 0 ? COMPONENT_SLUGS[currentIndex - 1] : null
  const nextSlug = currentIndex >= 0 && currentIndex < COMPONENT_SLUGS.length - 1
    ? COMPONENT_SLUGS[currentIndex + 1]
    : null

  const isComponentPage = currentIndex >= 0

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <nav aria-label={sidebarLabel}>
          <p className={styles.sidebarHeading}>{sidebarLabel}</p>
          <ul className={styles.sidebarList}>
            <li>
              <Link
                href="/components"
                className={`${styles.sidebarLink} ${!currentSlug ? styles.sidebarLinkActive : ''}`}
              >
                {t('all_components')}
              </Link>
            </li>
            {COMPONENT_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/components/${slug}`}
                  className={`${styles.sidebarLink} ${currentSlug === slug ? styles.sidebarLinkActive : ''}`}
                >
                  {COMPONENT_LABELS[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className={styles.content}>
        {children}

        {/* Prev / Next */}
        {isComponentPage && (prevSlug || nextSlug) && (
          <div className={styles.prevNext}>
            <div className={styles.prevNextInner}>
              {prevSlug ? (
                <Link href={`/components/${prevSlug}`} className={styles.prevNextCard}>
                  <span className={styles.prevNextDir}>←</span>
                  <span className={styles.prevNextName}>{COMPONENT_LABELS[prevSlug]}</span>
                </Link>
              ) : <span className={styles.prevNextSpacer} />}
              {nextSlug && (
                <Link href={`/components/${nextSlug}`} className={styles.prevNextCard}>
                  <span className={styles.prevNextName}>{COMPONENT_LABELS[nextSlug]}</span>
                  <span className={styles.prevNextDir}>→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
