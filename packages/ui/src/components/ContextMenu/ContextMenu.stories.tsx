import type { Meta, StoryObj } from '@storybook/react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from './ContextMenu'

const meta: Meta<typeof ContextMenuContent> = {
  title: 'Components/ContextMenu',
  component: ContextMenuContent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContextMenuContent>

const TriggerBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: 320,
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed var(--color-semantic-border)',
      borderRadius: 8,
      color: 'var(--color-semantic-foreground-muted)',
      fontSize: '0.875rem',
      userSelect: 'none',
    }}
  >
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerBox>Right-click here</TriggerBox>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          New File
          <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Save
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Close
          <ContextMenuShortcut>⌘W</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithCheckboxAndRadio: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerBox>Right-click for view options</TriggerBox>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show Toolbar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Sidebar</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="list">
          <ContextMenuLabel inset>Layout</ContextMenuLabel>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerBox>Right-click for submenu</TriggerBox>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More options</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Select All</ContextMenuItem>
            <ContextMenuItem>Deselect All</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
