import { getTranslations } from 'next-intl/server'
import ComponentsLayout from '@/components/ComponentsLayout'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('sidebar')
  return <ComponentsLayout sidebarLabel={t('components_heading')}>{children}</ComponentsLayout>
}
