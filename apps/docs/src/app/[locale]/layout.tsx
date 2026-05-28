import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/Nav'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import ModeToggle from '@/components/ModeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import BottomNav from '@/components/BottomNav'
import { DM_Sans, Playfair_Display, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import '@ghiberti85/tokens/ds-minimal'
import '@ghiberti85/tokens/ds-editorial'
import '@ghiberti85/tokens/ds-brutalist'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  ),
  title: 'Ghiberti UI — Design System',
  description: 'Design tokens and React component library — ds-minimal, ds-editorial, ds-brutalist',
  openGraph: {
    type: 'website',
    siteName: 'Ghiberti UI',
    title: 'Ghiberti UI — Design System',
    description: 'Design tokens and React component library — ds-minimal, ds-editorial, ds-brutalist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghiberti UI — Design System',
    description: 'Design tokens and React component library — ds-minimal, ds-editorial, ds-brutalist',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Ghiberti UI',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192.svg',
  },
}

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
      <head>
        <meta name="theme-color" content="#6d28d9" />
        {/* Anti-flash: apply dark mode before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('docs-color-mode');var d=s!==null?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.setAttribute('data-mode','dark');}catch(e){}})();`,
          }}
        />
      </head>
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
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
