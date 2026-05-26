import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ghiberti85/ui', '@ghiberti85/tokens'],
}

export default withNextIntl(nextConfig)
