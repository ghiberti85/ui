import { getTranslations } from 'next-intl/server'
import {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
  Heading,
  Text,
  Label,
  Code,
  Stack,
  Container,
} from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import styles from './page.module.css'
import { TextareaDemo, SelectDemo, CheckboxDemo, RadioGroupDemo, SwitchDemo } from '../../../components/demos/FormDemos'
import { DialogDemo } from '../../../components/demos/DialogDemo'

export default async function ComponentsPage() {
  const t = await getTranslations('components')

  const fruitOptions = [
    { value: 'apple', label: t('select_opt_apple') },
    { value: 'banana', label: t('select_opt_banana') },
    { value: 'cherry', label: t('select_opt_cherry') },
    { value: 'mango', label: t('select_opt_mango') },
  ]

  const radioOptions = [
    { value: 'email', label: t('radio_opt_email'), description: t('radio_opt_email_desc') },
    { value: 'phone', label: t('radio_opt_phone'), description: t('radio_opt_phone_desc') },
    { value: 'sms', label: t('radio_opt_sms'), description: t('radio_opt_sms_desc') },
  ]

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      {/* Button */}
      <section className={styles.section}>
        <h2 className={styles.componentName}><Link href="/components/button">Button</Link></h2>
        <p className={styles.componentDesc}>{t('button_desc')}</p>
        <div className={styles.demo}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <code className={styles.importLine}>import {'{ Button }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Badge */}
      <section className={styles.section}>
        <h2 className={styles.componentName}><Link href="/components/badge">Badge</Link></h2>
        <p className={styles.componentDesc}>{t('badge_desc')}</p>
        <div className={styles.demo}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <code className={styles.importLine}>import {'{ Badge }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Input */}
      <section className={styles.section}>
        <h2 className={styles.componentName}><Link href="/components/input">Input</Link></h2>
        <p className={styles.componentDesc}>{t('input_desc')}</p>
        <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', maxWidth: 360 }}>
          <Input label={t('input_label_default')} placeholder={t('input_placeholder')} />
          <Input label={t('input_label_error')} placeholder={t('input_placeholder')} error={t('input_error_msg')} />
          <Input label={t('input_label_disabled')} placeholder={t('input_placeholder')} disabled />
        </div>
        <code className={styles.importLine}>import {'{ Input }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Card */}
      <section className={styles.section}>
        <h2 className={styles.componentName}><Link href="/components/card">Card</Link></h2>
        <p className={styles.componentDesc}>{t('card_desc')}</p>
        <div className={styles.demo} style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Card style={{ width: 280 }}>
            <CardHeader>
              <CardTitle>{t('card_title')}</CardTitle>
              <CardDescription>{t('card_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '0.875rem' }}>{t('card_content')}</p>
            </CardContent>
          </Card>
        </div>
        <code className={styles.importLine}>import {'{ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* ── Form Components ────────────────────────────────────────────────────── */}
      <h2 className={styles.sectionGroupTitle}>{t('section_form')}</h2>

      {/* Textarea */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Textarea</h2>
        <p className={styles.componentDesc}>{t('textarea_desc')}</p>
        <div className={styles.demo}>
          <TextareaDemo
            labelDefault={t('textarea_label_default')}
            labelError={t('textarea_label_error')}
            labelDisabled={t('textarea_label_disabled')}
            placeholder={t('textarea_placeholder')}
            errorMsg={t('textarea_error_msg')}
            helperText={t('textarea_helper_text')}
          />
        </div>
        <code className={styles.importLine}>import {'{ Textarea }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Select */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Select</h2>
        <p className={styles.componentDesc}>{t('select_desc')}</p>
        <div className={styles.demo}>
          <SelectDemo
            labelDefault={t('select_label_default')}
            labelError={t('select_label_error')}
            labelDisabled={t('select_label_disabled')}
            placeholder={t('select_placeholder')}
            errorMsg={t('select_error_msg')}
            options={fruitOptions}
          />
        </div>
        <code className={styles.importLine}>import {'{ Select }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Checkbox */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Checkbox</h2>
        <p className={styles.componentDesc}>{t('checkbox_desc')}</p>
        <div className={styles.demo}>
          <CheckboxDemo
            labelUnchecked={t('checkbox_unchecked')}
            labelChecked={t('checkbox_checked')}
            labelIndeterminate={t('checkbox_indeterminate')}
            labelDisabled={t('checkbox_disabled')}
            descChecked={t('checkbox_checked_desc')}
          />
        </div>
        <code className={styles.importLine}>import {'{ Checkbox }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Radio */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Radio / RadioGroup</h2>
        <p className={styles.componentDesc}>{t('radio_desc')}</p>
        <div className={styles.demo}>
          <RadioGroupDemo
            groupLabel={t('radio_group_label')}
            options={radioOptions}
          />
        </div>
        <code className={styles.importLine}>import {'{ Radio, RadioGroup }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Switch */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Switch</h2>
        <p className={styles.componentDesc}>{t('switch_desc')}</p>
        <div className={styles.demo}>
          <SwitchDemo
            labelOff={t('switch_off')}
            labelOn={t('switch_on')}
            labelWithDesc={t('switch_with_desc_label')}
            descWithDesc={t('switch_with_desc_desc')}
            labelDisabled={t('switch_disabled')}
          />
        </div>
        <code className={styles.importLine}>import {'{ Switch }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* ── Display Components ─────────────────────────────────────────────────── */}
      <h2 className={styles.sectionGroupTitle}>{t('section_display')}</h2>

      {/* Dialog */}
      <section className={styles.section}>
        <h2 className={styles.componentName}><Link href="/components/dialog">Dialog</Link></h2>
        <p className={styles.componentDesc}>{t('dialog_desc')}</p>
        <div className={styles.demo}>
          <DialogDemo
            triggerLabel={t('dialog_trigger')}
            title={t('dialog_title')}
            description={t('dialog_description')}
            cancelLabel={t('dialog_cancel')}
            confirmLabel={t('dialog_confirm')}
          />
        </div>
        <code className={styles.importLine}>import {'{ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Separator */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Separator</h2>
        <p className={styles.componentDesc}>{t('separator_desc')}</p>
        <div className={styles.demoColumn}>
          <Text size="sm">{t('separator_before')}</Text>
          <Separator />
          <Text size="sm">{t('separator_after')}</Text>
        </div>
        <code className={styles.importLine}>import {'{ Separator }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Typography</h2>
        <p className={styles.componentDesc}>{t('typography_desc')}</p>

        <div className={styles.demoBoxLabel}>{t('typography_heading_label')}</div>
        <div className={styles.demoColumn}>
          <Heading as="h1" size="4xl">{t('typography_sample_h1')}</Heading>
          <Heading as="h2" size="3xl">{t('typography_sample_h2')}</Heading>
          <Heading as="h3" size="2xl">{t('typography_sample_h3')}</Heading>
          <Heading as="h4" size="xl">{t('typography_sample_h4')}</Heading>
        </div>

        <div className={styles.demoBoxLabel} style={{ marginTop: '1rem' }}>{t('typography_text_label')}</div>
        <div className={styles.demoColumn}>
          <Text size="xl">{t('typography_text_xl')}</Text>
          <Text size="lg">{t('typography_text_lg')}</Text>
          <Text size="md">{t('typography_text_md')}</Text>
          <Text size="sm">{t('typography_text_sm')}</Text>
          <Text size="xs">{t('typography_text_xs')}</Text>
          <Label>{t('typography_label_example')}</Label>
        </div>

        <div className={styles.demoBoxLabel} style={{ marginTop: '1rem' }}>{t('typography_code_label')}</div>
        <div className={styles.demoColumn}>
          <Text size="sm">Inline: <Code>{t('typography_code_inline')}</Code></Text>
          <Code block>{t('typography_code_block')}</Code>
        </div>

        <code className={styles.importLine}>import {'{ Heading, Text, Label, Code }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* ── Layout Components ──────────────────────────────────────────────────── */}
      <h2 className={styles.sectionGroupTitle}>{t('section_layout')}</h2>

      {/* Stack */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Stack</h2>
        <p className={styles.componentDesc}>{t('stack_desc')}</p>

        <div className={styles.demoBoxLabel}>{t('stack_vertical_label')}</div>
        <div className={styles.demoColumn}>
          <Stack direction="vertical" gap={3}>
            <Badge variant="default">{t('stack_item')} 1</Badge>
            <Badge variant="secondary">{t('stack_item')} 2</Badge>
            <Badge variant="outline">{t('stack_item')} 3</Badge>
          </Stack>
        </div>

        <div className={styles.demoBoxLabel} style={{ marginTop: '1rem' }}>{t('stack_horizontal_label')}</div>
        <div className={styles.demo}>
          <Stack direction="horizontal" gap={4} align="center">
            <Badge variant="default">{t('stack_item')} 1</Badge>
            <Badge variant="secondary">{t('stack_item')} 2</Badge>
            <Badge variant="outline">{t('stack_item')} 3</Badge>
          </Stack>
        </div>

        <code className={styles.importLine}>import {'{ Stack }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Container */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Container</h2>
        <p className={styles.componentDesc}>{t('container_desc')}</p>
        <div className={styles.demoColumn}>
          <Container size="sm" style={{ border: '1px dashed var(--color-semantic-border)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>
            <Text size="sm">{t('container_sm')}</Text>
          </Container>
          <Container size="md" style={{ border: '1px dashed var(--color-semantic-border)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>
            <Text size="sm">{t('container_md')}</Text>
          </Container>
          <Container size="lg" style={{ border: '1px dashed var(--color-semantic-border)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>
            <Text size="sm">{t('container_lg')}</Text>
          </Container>
        </div>
        <code className={styles.importLine}>import {'{ Container }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>
    </div>
  )
}
