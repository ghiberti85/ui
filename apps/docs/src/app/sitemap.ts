import { MetadataRoute } from 'next'

const BASE_URL = 'https://ghiberti-ui.vercel.app'
const LOCALES = ['en', 'pt-BR'] as const

const COMPONENT_SLUGS = [
  'button', 'badge', 'input', 'textarea', 'select',
  'checkbox', 'radio', 'switch', 'card', 'dialog',
  'tooltip', 'avatar', 'separator', 'typography', 'stack', 'container',
  'tabs', 'accordion', 'toast', 'table',
  'progress', 'skeleton', 'alert', 'popover', 'spinner',
  'dropdown-menu', 'alert-dialog', 'combobox', 'breadcrumb', 'pagination',
  'calendar', 'date-picker', 'command', 'number-input', 'file-upload', 'timeline',
  'slider', 'chip', 'rating', 'stepper',
  'drawer', 'data-table', 'otp-input', 'tag-input', 'chat-message', 'streaming-text',
  'hover-card', 'context-menu', 'empty-state', 'scroll-area',
]

const STATIC_PATHS = [
  '',
  '/getting-started',
  '/tokens',
  '/tokens/motion',
  '/playground',
  '/components',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path === '/components' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      })
    }

    for (const slug of COMPONENT_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/components/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/components/${slug}`])
          ),
        },
      })
    }
  }

  return entries
}
