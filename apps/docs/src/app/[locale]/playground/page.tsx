import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PlaygroundClient from './PlaygroundClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('playground')
  return {
    title: `${t('title')} — Ghiberti UI`,
    description: t('description'),
  }
}

export default async function PlaygroundPage() {
  const t = await getTranslations('playground')

  return (
    <>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem 0' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.375rem', color: 'var(--color-semantic-foreground)' }}>
          {t('how_title')}
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {t('how_desc')}
        </p>
      </div>
      <PlaygroundClient
      labels={{
        title: t('title'),
        description: t('description'),
        primaryColor: t('primary_color'),
        background: t('background'),
        borderRadius: t('border_radius'),
        fontSize: t('font_size'),
        reset: t('reset'),
        copyCss: t('copy_css'),
        copied: t('copied'),
        controls: t('controls'),
        preview: t('preview'),
      }}
    />
    </>
  )
}
