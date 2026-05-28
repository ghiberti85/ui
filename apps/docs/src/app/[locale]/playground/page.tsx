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
  )
}
