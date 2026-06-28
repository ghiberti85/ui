import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultValue: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account settings and preferences.
      </TabsContent>
      <TabsContent value="password">
        Change your password and security settings.
      </TabsContent>
      <TabsContent value="notifications">
        Configure how and when you receive notifications.
      </TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Tabs defaultValue="account" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account settings and preferences.
      </TabsContent>
      <TabsContent value="password">
        Change your password and security settings.
      </TabsContent>
      <TabsContent value="notifications">
        Configure how and when you receive notifications.
      </TabsContent>
    </Tabs>
  ),
}

export const SwitchTab: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your account settings and preferences.</TabsContent>
      <TabsContent value="password">Change your password and security settings.</TabsContent>
      <TabsContent value="notifications">Configure how and when you receive notifications.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Manage your account settings and preferences.')).toBeVisible()
    await userEvent.click(canvas.getByRole('tab', { name: 'Password' }))
    await expect(canvas.getByText('Change your password and security settings.')).toBeVisible()
    await userEvent.click(canvas.getByRole('tab', { name: 'Notifications' }))
    await expect(canvas.getByText('Configure how and when you receive notifications.')).toBeVisible()
  },
}

export const Vertical: Story = {
  render: (args) => (
    <Tabs defaultValue="account" orientation="vertical" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account settings and preferences.
      </TabsContent>
      <TabsContent value="password">
        Change your password and security settings.
      </TabsContent>
      <TabsContent value="notifications">
        Configure how and when you receive notifications.
      </TabsContent>
    </Tabs>
  ),
}
