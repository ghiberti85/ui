import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: '480px' }}>
      <AccordionItem value="item1">
        <AccordionTrigger>What is a design system?</AccordionTrigger>
        <AccordionContent>
          A design system is a collection of reusable components, guided by clear standards, that can
          be assembled together to build any number of applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>How do I install the package?</AccordionTrigger>
        <AccordionContent>
          Run <code>pnpm add @ghiberti85/ui</code> and import the CSS tokens before using any
          component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Yes. Add <code>data-mode="dark"</code> to any ancestor element and all components inside
          will switch to dark mode automatically via CSS custom properties.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" style={{ width: '480px' }}>
      <AccordionItem value="item1">
        <AccordionTrigger>Tokens</AccordionTrigger>
        <AccordionContent>
          Design tokens are the visual design atoms of the design system — specifically, they are
          named entities that store visual design attributes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Components</AccordionTrigger>
        <AccordionContent>
          Components are reusable UI building blocks built on top of tokens. They are accessible by
          default and support all three design systems.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionTrigger>Theming</AccordionTrigger>
        <AccordionContent>
          Switch between <code>ds-minimal</code>, <code>ds-editorial</code>, and{' '}
          <code>ds-brutalist</code> by changing the <code>data-theme</code> attribute on the root
          element.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item1" style={{ width: '480px' }}>
      <AccordionItem value="item1">
        <AccordionTrigger>Open by default</AccordionTrigger>
        <AccordionContent>
          This item is expanded on first render because <code>defaultValue="item1"</code> was set on
          the root Accordion.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Collapsed by default</AccordionTrigger>
        <AccordionContent>
          This item starts collapsed and can be opened by clicking the trigger above.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionTrigger>Also collapsed</AccordionTrigger>
        <AccordionContent>Another item that starts in a collapsed state.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
