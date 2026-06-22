'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
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
  Tooltip,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Progress,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  Alert,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Combobox,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  Calendar,
  DatePicker,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  NumberInput,
  FileUpload,
  Timeline,
  Slider,
  Chip,
  Rating,
  Stepper,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DataTable,
  OTPInput,
  TagInput,
  ChatMessage,
  ChatContainer,
  StreamingText,
  HoverCard, HoverCardTrigger, HoverCardContent,
} from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import styles from '@/app/[locale]/components/page.module.css'
import searchStyles from './ComponentsPageClient.module.css'
import { TextareaDemo, SelectDemo, CheckboxDemo, RadioGroupDemo, SwitchDemo } from './demos/FormDemos'
import { DialogDemo } from './demos/DialogDemo'
import { ToastDemo } from './demos/ToastDemo'

interface ComponentEntry {
  id: string
  name: string
  description: string
  section: string
  element: React.ReactNode
  href?: string
}

function PaginationDemoWrapper() {
  const [page, setPage] = useState(3)
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />
}

function NumberInputWrapper() {
  const [v, setV] = useState<number | undefined>(42)
  return <NumberInput value={v} onChange={setV} min={0} max={999} label="Quantity" />
}

export default function ComponentsPageClient() {
  const t = useTranslations('components')
  const [query, setQuery] = useState('')

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

  const components: ComponentEntry[] = [
    {
      id: 'button',
      name: 'Button',
      description: t('button_desc'),
      section: 'core',
      element: (
        <>
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
        </>
      ),
      href: '/components/button',
    } as ComponentEntry & { href: string },
    {
      id: 'badge',
      name: 'Badge',
      description: t('badge_desc'),
      section: 'core',
      element: (
        <>
          <div className={styles.demo}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <code className={styles.importLine}>import {'{ Badge }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
      href: '/components/badge',
    } as ComponentEntry & { href: string },
    {
      id: 'input',
      name: 'Input',
      description: t('input_desc'),
      section: 'form',
      element: (
        <>
          <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', maxWidth: 360 }}>
            <Input label={t('input_label_default')} placeholder={t('input_placeholder')} />
            <Input label={t('input_label_error')} placeholder={t('input_placeholder')} error={t('input_error_msg')} />
            <Input label={t('input_label_disabled')} placeholder={t('input_placeholder')} disabled />
          </div>
          <code className={styles.importLine}>import {'{ Input }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
      href: '/components/input',
    } as ComponentEntry & { href: string },
    {
      id: 'card',
      name: 'Card',
      description: t('card_desc'),
      section: 'core',
      element: (
        <>
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
        </>
      ),
      href: '/components/card',
    } as ComponentEntry & { href: string },
    {
      id: 'textarea',
      name: 'Textarea',
      description: t('textarea_desc'),
      section: 'form',
      href: '/components/textarea',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'select',
      name: 'Select',
      description: t('select_desc'),
      section: 'form',
      href: '/components/select',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      description: t('checkbox_desc'),
      section: 'form',
      href: '/components/checkbox',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'radio',
      name: 'Radio / RadioGroup',
      description: t('radio_desc'),
      section: 'form',
      href: '/components/radio',
      element: (
        <>
          <div className={styles.demo}>
            <RadioGroupDemo
              groupLabel={t('radio_group_label')}
              options={radioOptions}
            />
          </div>
          <code className={styles.importLine}>import {'{ Radio, RadioGroup }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'switch',
      name: 'Switch',
      description: t('switch_desc'),
      section: 'form',
      href: '/components/switch',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'dialog',
      name: 'Dialog',
      description: t('dialog_desc'),
      section: 'display',
      element: (
        <>
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
        </>
      ),
      href: '/components/dialog',
    } as ComponentEntry & { href: string },
    {
      id: 'separator',
      name: 'Separator',
      description: t('separator_desc'),
      section: 'display',
      href: '/components/separator',
      element: (
        <>
          <div className={styles.demoColumn}>
            <Text size="sm">{t('separator_before')}</Text>
            <Separator />
            <Text size="sm">{t('separator_after')}</Text>
          </div>
          <code className={styles.importLine}>import {'{ Separator }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'typography',
      name: 'Typography',
      description: t('typography_desc'),
      section: 'display',
      href: '/components/typography',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'stack',
      name: 'Stack',
      description: t('stack_desc'),
      section: 'layout',
      href: '/components/stack',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'container',
      name: 'Container',
      description: t('container_desc'),
      section: 'layout',
      href: '/components/container',
      element: (
        <>
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
        </>
      ),
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      description: t('tooltip_desc'),
      section: 'display',
      href: '/components/tooltip',
      element: (
        <>
          <div className={styles.demo}>
            <Tooltip content={t('tooltip_demo_top')} side="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content={t('tooltip_demo_right')} side="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
            <Tooltip content={t('tooltip_demo_bottom')} side="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content={t('tooltip_demo_left')} side="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>
          </div>
          <code className={styles.importLine}>import {'{ Tooltip }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'avatar',
      name: 'Avatar',
      description: t('avatar_desc'),
      section: 'display',
      href: '/components/avatar',
      element: (
        <>
          <div className={styles.demo}>
            <Avatar fallback="FG" size="xs" />
            <Avatar fallback="FG" size="sm" />
            <Avatar fallback="FG" size="md" />
            <Avatar fallback="FG" size="lg" />
            <Avatar fallback="FG" size="xl" />
            <Avatar fallback="FG" size="lg" shape="square" />
            <Avatar alt="Fernando Ghiberti" size="md" />
          </div>
          <code className={styles.importLine}>import {'{ Avatar }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description: t('tabs_desc'),
      section: 'display',
      href: '/components/tabs',
      element: (
        <>
          <div className={styles.demoColumn}>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p style={{ fontSize: '0.875rem', padding: '0.75rem 0' }}>Manage your account settings.</p>
              </TabsContent>
              <TabsContent value="password">
                <p style={{ fontSize: '0.875rem', padding: '0.75rem 0' }}>Change your password here.</p>
              </TabsContent>
              <TabsContent value="notifications">
                <p style={{ fontSize: '0.875rem', padding: '0.75rem 0' }}>Configure notification preferences.</p>
              </TabsContent>
            </Tabs>
          </div>
          <code className={styles.importLine}>import {'{ Tabs, TabsList, TabsTrigger, TabsContent }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'accordion',
      name: 'Accordion',
      description: t('accordion_desc'),
      section: 'display',
      href: '/components/accordion',
      element: (
        <>
          <div className={styles.demoColumn} style={{ maxWidth: 560 }}>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are design tokens?</AccordionTrigger>
                <AccordionContent>Design tokens are the visual design atoms — colors, spacing, and typography stored as named variables.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>Yes. Apply <code>data-mode=&quot;dark&quot;</code> to any ancestor element to activate the dark palette.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it framework-agnostic?</AccordionTrigger>
                <AccordionContent>Works with Next.js, Remix, Vite, and any framework that supports React 18+.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <code className={styles.importLine}>import {'{ Accordion, AccordionItem, AccordionTrigger, AccordionContent }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'toast',
      name: 'Toast',
      description: t('toast_desc'),
      section: 'display',
      href: '/components/toast',
      element: (
        <>
          <div className={styles.demoColumn}>
            <ToastDemo />
          </div>
          <code className={styles.importLine}>import {'{ Toaster, useToast }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'table',
      name: 'Table',
      description: t('table_component_desc'),
      section: 'display',
      href: '/components/table',
      element: (
        <>
          <div className={styles.demoColumn}>
            <Table>
              <TableCaption>Recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>INV-001</TableCell><TableCell>Paid</TableCell><TableCell>Credit Card</TableCell><TableCell>$250.00</TableCell></TableRow>
                <TableRow><TableCell>INV-002</TableCell><TableCell>Pending</TableCell><TableCell>Bank Transfer</TableCell><TableCell>$150.00</TableCell></TableRow>
                <TableRow><TableCell>INV-003</TableCell><TableCell>Paid</TableCell><TableCell>PayPal</TableCell><TableCell>$350.00</TableCell></TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <code className={styles.importLine}>import {'{ Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'progress',
      name: 'Progress',
      description: t('progress_desc'),
      section: 'display',
      href: '/components/progress',
      element: (
        <>
          <div className={styles.demoColumn} style={{ maxWidth: 480 }}>
            <Progress value={60} aria-label="Default" />
            <Progress value={80} variant="success" aria-label="Success" />
            <Progress value={40} variant="warning" aria-label="Warning" />
            <Progress value={25} variant="error" aria-label="Error" />
          </div>
          <code className={styles.importLine}>import {'{ Progress }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'skeleton',
      name: 'Skeleton',
      description: t('skeleton_desc'),
      section: 'display',
      href: '/components/skeleton',
      element: (
        <>
          <div className={styles.demoColumn} style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <SkeletonAvatar size={40} />
              <div style={{ flex: 1 }}><SkeletonText lines={2} /></div>
            </div>
            <Skeleton height="120px" />
            <SkeletonText lines={3} />
          </div>
          <code className={styles.importLine}>import {'{ Skeleton, SkeletonText, SkeletonAvatar }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'alert',
      name: 'Alert',
      description: t('alert_desc'),
      section: 'display',
      href: '/components/alert',
      element: (
        <>
          <div className={styles.demoColumn} style={{ maxWidth: 480 }}>
            <Alert variant="info" title="Info">This is an informational alert.</Alert>
            <Alert variant="success" title="Success">Operation completed.</Alert>
            <Alert variant="warning" title="Warning">Proceed with caution.</Alert>
            <Alert variant="error" title="Error">Something went wrong.</Alert>
          </div>
          <code className={styles.importLine}>import {'{ Alert }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'popover',
      name: 'Popover',
      description: t('popover_desc'),
      section: 'display',
      href: '/components/popover',
      element: (
        <>
          <div className={styles.demo}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>This is popover content.</p>
              </PopoverContent>
            </Popover>
          </div>
          <code className={styles.importLine}>import {'{ Popover, PopoverTrigger, PopoverContent, PopoverClose }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'spinner',
      name: 'Spinner',
      description: t('spinner_desc'),
      section: 'display',
      href: '/components/spinner',
      element: (
        <>
          <div className={styles.demo}>
            <Spinner size="sm" label="Small" />
            <Spinner size="md" label="Medium" />
            <Spinner size="lg" label="Large" />
            <Spinner size="xl" label="Extra Large" />
          </div>
          <code className={styles.importLine}>import {'{ Spinner }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'dropdown-menu',
      name: 'DropdownMenu',
      description: t('dropdown_menu_desc'),
      section: 'display',
      href: '/components/dropdown-menu',
      element: (
        <>
          <div className={styles.demo}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <code className={styles.importLine}>import {'{ DropdownMenu, … }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'alert-dialog',
      name: 'AlertDialog',
      description: t('alert_dialog_desc'),
      section: 'display',
      href: '/components/alert-dialog',
      element: (
        <>
          <div className={styles.demo}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" size="sm">Open Alert</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <code className={styles.importLine}>import {'{ AlertDialog, … }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'combobox',
      name: 'Combobox',
      description: t('combobox_desc'),
      section: 'form',
      href: '/components/combobox',
      element: (
        <>
          <div className={styles.demo}>
            <Combobox
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
              ]}
              placeholder="Select framework..."
            />
          </div>
          <code className={styles.importLine}>import {'{ Combobox }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'breadcrumb',
      name: 'Breadcrumb',
      description: t('breadcrumb_desc'),
      section: 'layout',
      href: '/components/breadcrumb',
      element: (
        <>
          <div className={styles.demo}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Page</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <code className={styles.importLine}>import {'{ Breadcrumb, … }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'pagination',
      name: 'Pagination',
      description: t('pagination_desc'),
      section: 'layout',
      href: '/components/pagination',
      element: (
        <>
          <div className={styles.demo}>
            <PaginationDemoWrapper />
          </div>
          <code className={styles.importLine}>import {'{ Pagination }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: t('calendar_desc'),
      section: 'display',
      href: '/components/calendar',
      element: (
        <>
          <div className={styles.demo}>
            <Calendar mode="single" />
          </div>
          <code className={styles.importLine}>import {'{ Calendar }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'date-picker',
      name: 'DatePicker',
      description: t('date_picker_desc'),
      section: 'display',
      href: '/components/date-picker',
      element: (
        <>
          <div className={styles.demo}>
            <DatePicker placeholder="Pick a date" />
          </div>
          <code className={styles.importLine}>import {'{ DatePicker }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'command',
      name: 'Command',
      description: t('command_desc'),
      section: 'overlay',
      href: '/components/command',
      element: (
        <>
          <div className={styles.demo}>
            <Command style={{ maxWidth: '100%', border: '1px solid var(--color-semantic-border)' }}>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem value="new">New File</CommandItem>
                  <CommandItem value="open">Open</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          <code className={styles.importLine}>import {'{ Command, … }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'number-input',
      name: 'NumberInput',
      description: t('number_input_desc'),
      section: 'form',
      href: '/components/number-input',
      element: (
        <>
          <div className={styles.demo}>
            <NumberInputWrapper />
          </div>
          <code className={styles.importLine}>import {'{ NumberInput }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'file-upload',
      name: 'FileUpload',
      description: t('file_upload_desc'),
      section: 'form',
      href: '/components/file-upload',
      element: (
        <>
          <div className={styles.demo}>
            <FileUpload label="Drop files here" hint="Any file type" />
          </div>
          <code className={styles.importLine}>import {'{ FileUpload }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'timeline',
      name: 'Timeline',
      description: t('timeline_desc'),
      section: 'display',
      href: '/components/timeline',
      element: (
        <>
          <div className={styles.demo}>
            <Timeline
              items={[
                { title: 'Project started', date: 'Jan 2024', variant: 'success' },
                { title: 'Beta launched', date: 'Mar 2024', variant: 'info' },
                { title: 'v1.0 released', date: 'Jun 2024', variant: 'success' },
              ]}
            />
          </div>
          <code className={styles.importLine}>import {'{ Timeline }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'slider',
      name: 'Slider',
      description: t('slider_desc'),
      section: 'display',
      href: '/components/slider',
      element: (
        <>
          <div className={styles.demo}>
            <Slider defaultValue={60} aria-label="Volume" style={{ maxWidth: 280 }} />
          </div>
          <code className={styles.importLine}>import {'{ Slider }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'chip',
      name: 'Chip',
      description: t('chip_desc'),
      section: 'display',
      href: '/components/chip',
      element: (
        <>
          <div className={styles.demo}>
            <Chip variant="default">React</Chip>
            <Chip variant="secondary">TypeScript</Chip>
            <Chip variant="success">Active</Chip>
            <Chip variant="outline">Draft</Chip>
          </div>
          <code className={styles.importLine}>import {'{ Chip }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'rating',
      name: 'Rating',
      description: t('rating_desc'),
      section: 'display',
      href: '/components/rating',
      element: (
        <>
          <div className={styles.demo}>
            <Rating value={4} readOnly />
          </div>
          <code className={styles.importLine}>import {'{ Rating }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'stepper',
      name: 'Stepper',
      description: t('stepper_desc'),
      section: 'display',
      href: '/components/stepper',
      element: (
        <>
          <div className={styles.demo}>
            <Stepper
              steps={[
                { label: 'Account' },
                { label: 'Profile' },
                { label: 'Done' },
              ]}
              activeStep={1}
            />
          </div>
          <code className={styles.importLine}>import {'{ Stepper }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'drawer',
      name: 'Drawer',
      description: t('drawer_desc'),
      section: 'overlay',
      href: '/components/drawer',
      element: (
        <>
          <div className={styles.demo}>
            <Drawer>
              <DrawerTrigger asChild>
                <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--color-semantic-border)', background: 'var(--color-semantic-background)', cursor: 'pointer', color: 'var(--color-semantic-foreground)' }}>Open Drawer</button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerHeader>
                  <DrawerTitle>Drawer</DrawerTitle>
                  <DrawerDescription>Slide-in panel from the right.</DrawerDescription>
                </DrawerHeader>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-semantic-foreground-muted)' }}>Content goes here.</p>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--color-semantic-border)', background: 'var(--color-semantic-background)', cursor: 'pointer', color: 'var(--color-semantic-foreground)' }}>Close</button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <code className={styles.importLine}>import {'{ Drawer, DrawerContent }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'data-table',
      name: 'DataTable',
      description: t('data_table_desc'),
      section: 'display',
      href: '/components/data-table',
      element: (
        <>
          <div className={styles.demo} style={{ width: '100%' }}>
            <DataTable
              columns={[
                { key: 'name', header: 'Name', sortable: true },
                { key: 'role', header: 'Role' },
              ]}
              data={[
                { name: 'Alice', role: 'Engineer' },
                { name: 'Bob', role: 'Designer' },
              ]}
            />
          </div>
          <code className={styles.importLine}>import {'{ DataTable }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'otp-input',
      name: 'OTPInput',
      description: t('otp_input_desc'),
      section: 'form',
      href: '/components/otp-input',
      element: (
        <>
          <div className={styles.demo}>
            <OTPInput length={6} />
          </div>
          <code className={styles.importLine}>import {'{ OTPInput }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'tag-input',
      name: 'TagInput',
      description: t('tag_input_desc'),
      section: 'form',
      href: '/components/tag-input',
      element: (
        <>
          <div className={styles.demo} style={{ width: '100%', maxWidth: 360 }}>
            <TagInput value={['React', 'TypeScript']} onChange={() => {}} />
          </div>
          <code className={styles.importLine}>import {'{ TagInput }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'chat-message',
      name: 'ChatMessage',
      description: t('chat_message_desc'),
      section: 'display',
      href: '/components/chat-message',
      element: (
        <>
          <div className={styles.demo} style={{ flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
            <ChatContainer>
              <ChatMessage role="user" content="Hello!" />
              <ChatMessage role="assistant" content="Hi there!" />
            </ChatContainer>
          </div>
          <code className={styles.importLine}>import {'{ ChatMessage }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'streaming-text',
      name: 'StreamingText',
      description: t('streaming_text_desc'),
      section: 'display',
      href: '/components/streaming-text',
      element: (
        <>
          <div className={styles.demo}>
            <StreamingText text="Streaming text animation..." speed={40} />
          </div>
          <code className={styles.importLine}>import {'{ StreamingText }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
    {
      id: 'hover-card',
      name: 'HoverCard',
      description: t('hover_card_desc'),
      section: 'display',
      href: '/components/hover-card',
      element: (
        <>
          <div className={styles.demo}>
            <HoverCard openDelay={100}>
              <HoverCardTrigger asChild>
                <a href="#" style={{ color: 'var(--color-semantic-primary)', textDecoration: 'underline' }} onClick={(e) => e.preventDefault()}>
                  @ghiberti85
                </a>
              </HoverCardTrigger>
              <HoverCardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <strong style={{ color: 'var(--color-semantic-foreground)' }}>Fernando Ghiberti</strong>
                  <span style={{ color: 'var(--color-semantic-foreground-muted)', fontSize: '0.875rem' }}>Senior Full-Stack Engineer</span>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <code className={styles.importLine}>import {'{ HoverCard, HoverCardTrigger, HoverCardContent }'} from &apos;@ghiberti85/ui&apos;</code>
        </>
      ),
    },
  ]

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return components
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.section.toLowerCase().includes(q)
    )
  }, [query, components])

  const hasResults = filtered.length > 0

  const sections = [
    { id: 'core', label: null },
    { id: 'form', label: t('section_form') },
    { id: 'display', label: t('section_display') },
    { id: 'layout', label: t('section_layout') },
  ]

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <div className={searchStyles.searchWrap}>
        <div className={searchStyles.searchIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12ZM14 14l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <input
          type="search"
          className={searchStyles.searchInput}
          placeholder={t('search_placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('search_label')}
        />
        {query && (
          <span className={searchStyles.searchCount} aria-live="polite">
            {filtered.length === 0
              ? t('search_no_results')
              : t('search_results_count', { count: filtered.length })}
          </span>
        )}
      </div>

      {!hasResults && (
        <p className={searchStyles.noResults}>{t('search_no_results_hint', { query })}</p>
      )}

      {sections.map(({ id, label }) => {
        const sectionComponents = filtered.filter((c) => c.section === id)
        if (sectionComponents.length === 0) return null

        return (
          <div key={id}>
            {label && <h2 className={styles.sectionGroupTitle}>{label}</h2>}
            {sectionComponents.map((comp) => {
              const href = (comp as ComponentEntry & { href?: string }).href
              return (
                <section key={comp.id} className={styles.section}>
                  <h2 className={styles.componentName}>
                    {href ? <Link href={href}>{comp.name}</Link> : comp.name}
                  </h2>
                  <p className={styles.componentDesc}>{comp.description}</p>
                  {comp.element}
                </section>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
