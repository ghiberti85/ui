import type { Preview } from '@storybook/react'

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
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'ds-minimal'
      document.documentElement.setAttribute('data-theme', theme)
      return Story()
    },
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
