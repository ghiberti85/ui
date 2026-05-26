import type { Preview } from '@storybook/react'
import { withMode } from './decorators'

// Import Google Fonts for all design systems
import './fonts.css'

// Import all design system token files
import '@ghiberti85/tokens/ds-minimal'
import '@ghiberti85/tokens/ds-editorial'
import '@ghiberti85/tokens/ds-brutalist'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design System',
      defaultValue: 'ds-minimal',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'ds-minimal',   title: 'Minimal' },
          { value: 'ds-editorial', title: 'Editorial' },
          { value: 'ds-brutalist', title: 'Brutalist' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Color mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  globals: {
    mode: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'ds-minimal'
      document.documentElement.setAttribute('data-theme', theme)
      return Story()
    },
    withMode,
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark',  value: '#000000' },
      ],
    },
  },
}

export default preview
