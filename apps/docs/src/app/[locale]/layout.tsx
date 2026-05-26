import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/Nav'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import '@ghiberti85/tokens/ds-minimal'
import '@ghiberti85/tokens/ds-editorial'
import '@ghiberti85/tokens/ds-brutalist'
import './globals.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html lang={locale} data-theme="ds-minimal">
      <body>
        <NextIntlClientProvider>
          <header className="site-header">
            <div className="site-header-inner">
              <Nav />
              <ThemeSwitcher />
            </div>
          </header>
          <main className="site-main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
