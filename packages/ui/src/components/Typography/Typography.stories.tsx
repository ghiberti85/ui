import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Text, Label, Code } from './Typography'

// ── Heading ───────────────────────────────────────────────────────────────────

const headingMeta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['4xl', '3xl', '2xl', 'xl', 'lg', 'md'],
    },
  },
}

export default headingMeta
type HeadingStory = StoryObj<typeof Heading>

export const Default: HeadingStory = {
  args: { children: 'The quick brown fox' },
}

export const AllSizes: HeadingStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading size="4xl">Heading 4XL</Heading>
      <Heading size="3xl">Heading 3XL</Heading>
      <Heading size="2xl">Heading 2XL</Heading>
      <Heading size="xl">Heading XL</Heading>
      <Heading size="lg">Heading LG</Heading>
      <Heading size="md">Heading MD</Heading>
    </div>
  ),
}

export const SemanticLevels: HeadingStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Heading as="h1" size="4xl">H1 — Page title</Heading>
      <Heading as="h2" size="3xl">H2 — Section title</Heading>
      <Heading as="h3" size="2xl">H3 — Sub-section</Heading>
      <Heading as="h4" size="xl">H4 — Sub-sub</Heading>
      <Heading as="h5" size="lg">H5 — Minor</Heading>
      <Heading as="h6" size="md">H6 — Micro</Heading>
    </div>
  ),
}

// ── Text ──────────────────────────────────────────────────────────────────────

export const TextDefault: StoryObj<typeof Text> = {
  name: 'Text / Default',
  render: () => <Text>The quick brown fox jumps over the lazy dog.</Text>,
}

export const TextAllSizes: StoryObj<typeof Text> = {
  name: 'Text / All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text size="xl">Text XL — The quick brown fox</Text>
      <Text size="lg">Text LG — The quick brown fox</Text>
      <Text size="md">Text MD — The quick brown fox</Text>
      <Text size="sm">Text SM — The quick brown fox</Text>
      <Text size="xs">Text XS — The quick brown fox</Text>
    </div>
  ),
}

export const TextWeights: StoryObj<typeof Text> = {
  name: 'Text / Weights',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text weight="regular">Regular — The quick brown fox</Text>
      <Text weight="medium">Medium — The quick brown fox</Text>
      <Text weight="semibold">Semibold — The quick brown fox</Text>
      <Text weight="bold">Bold — The quick brown fox</Text>
    </div>
  ),
}

export const TextColors: StoryObj<typeof Text> = {
  name: 'Text / Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="default">Default foreground color</Text>
      <Text color="muted">Muted foreground color</Text>
    </div>
  ),
}

export const TextPolymorphic: StoryObj<typeof Text> = {
  name: 'Text / Polymorphic (as)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text as="p">Paragraph element</Text>
      <Text as="span">Span element (inline)</Text>
      <Text as="div">Div element</Text>
    </div>
  ),
}

// ── Label ─────────────────────────────────────────────────────────────────────

export const LabelDefault: StoryObj<typeof Label> = {
  name: 'Label / Default',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="demo-input">Email address</Label>
      <input id="demo-input" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const LabelRequired: StoryObj<typeof Label> = {
  name: 'Label / Required',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="demo-req" required>Full name</Label>
      <input id="demo-req" type="text" placeholder="Jane Doe" aria-required="true" />
    </div>
  ),
}

// ── Code ──────────────────────────────────────────────────────────────────────

export const CodeInline: StoryObj<typeof Code> = {
  name: 'Code / Inline',
  render: () => (
    <Text>
      Use the <Code>console.log()</Code> function to debug your code.
    </Text>
  ),
}

export const CodeBlock: StoryObj<typeof Code> = {
  name: 'Code / Block',
  render: () => (
    <Code block>
      {`function greet(name: string): string {
  return \`Hello, \${name}!\`
}

console.log(greet('World'))`}
    </Code>
  ),
}
