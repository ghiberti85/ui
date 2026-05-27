import type { Meta, StoryObj } from '@storybook/react'
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
