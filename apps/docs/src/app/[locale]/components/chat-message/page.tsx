import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { ChatMessage, ChatContainer } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default async function ChatMessagePage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'role', type: "'user' | 'assistant' | 'system'", defaultValue: '—', description: t('chat_message_prop_role') },
    { prop: 'content', type: 'string', defaultValue: '—', description: t('chat_message_prop_content') },
    { prop: 'timestamp', type: 'string', defaultValue: '—', description: t('chat_message_prop_timestamp') },
    { prop: 'avatar', type: 'React.ReactNode', defaultValue: '—', description: t('chat_message_prop_avatar') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { ChatMessage, ChatContainer } from '@ghiberti85/ui'

<ChatContainer>
  <ChatMessage role="system" content="Conversation started" timestamp="10:00 AM" />
  <ChatMessage role="user" content="Hello!" timestamp="10:01 AM" />
  <ChatMessage
    role="assistant"
    content="Hi! How can I help you today?"
    timestamp="10:01 AM"
    avatar={<YourAvatar />}
  />
</ChatContainer>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>ChatMessage</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>ChatMessage</h1>
        <p className={styles.description}>{tc('chat_message_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ width: '100%', maxWidth: 480 }}>
          <ChatContainer style={{ border: '1px solid var(--color-semantic-border)', borderRadius: 8 }}>
            <ChatMessage role="system" content="Chat started" timestamp="10:00 AM" />
            <ChatMessage role="user" content="Hello! Can you help me?" timestamp="10:01 AM" />
            <ChatMessage role="assistant" content="Of course! What do you need?" timestamp="10:01 AM" />
            <ChatMessage role="user" content="Tell me about the components." timestamp="10:02 AM" />
            <ChatMessage role="assistant" content="This library has 40+ accessible React components built on design tokens!" timestamp="10:02 AM" />
          </ChatContainer>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-chatmessage--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.storybookLink}
        >
          {t('storybook_link')} →
        </a>
      </section>
    </div>
  )
}
