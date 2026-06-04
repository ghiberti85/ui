import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from '../Button/Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'ghost', 'filled'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    hoverable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="primary">Action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>Stronger shadow, no border.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Stands out from the background with a deeper shadow.</p>
      </CardContent>
    </Card>
  ),
}

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>Subtle background, no border or shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Blends into the page with a muted background.</p>
      </CardContent>
    </Card>
  ),
}

export const Filled: Story = {
  render: () => (
    <Card variant="filled" style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Filled Card</CardTitle>
        <CardDescription>Primary color background with inverted text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Used for highlighted or promotional content.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="ghost">Learn more</Button>
      </CardFooter>
    </Card>
  ),
}

export const Hoverable: Story = {
  render: () => (
    <Card hoverable style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>Lifts on hover — great for clickable cards.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Hover over this card to see the lift effect.</p>
      </CardContent>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardImage src="https://picsum.photos/seed/card/720/405" alt="Sample landscape" aspectRatio="16/9" />
      <CardHeader>
        <CardTitle>Media Card</CardTitle>
        <CardDescription>Image at the top with content below.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>A card with a top image is perfect for blog posts and articles.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="primary">Read more</Button>
      </CardFooter>
    </Card>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Card orientation="horizontal" style={{ maxWidth: 560 }}>
      <CardImage src="https://picsum.photos/seed/horiz/400/600" alt="Thumbnail" position="left" />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardHeader>
          <CardTitle>Horizontal Layout</CardTitle>
          <CardDescription>Image on the left, content on the right.</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0 }}>Useful for list items, search results, or media rows.</p>
        </CardContent>
      </div>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      {(['default', 'elevated', 'ghost', 'filled'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>Variant: {variant}</CardTitle>
            <CardDescription>Card with variant="{variant}"</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>Content area.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
