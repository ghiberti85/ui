import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/Nav'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import ModeToggle from '@/components/ModeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { DM_Sans, Playfair_Display, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import '@ghiberti85/tokens/ds-minimal'
import '@ghiberti85/tokens/ds-editorial'
import '@ghiberti85/tokens/ds-brutalist'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

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
    <html
      lang={locale}
      data-theme="ds-minimal"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <header className="site-header">
            <div className="site-header-inner">
              <Nav />
              <div className="site-header-controls">
                <ThemeSwitcher />
                <LocaleSwitcher />
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="site-main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
