import type { Preview } from '@storybook/react'

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
  },
}

export default preview
