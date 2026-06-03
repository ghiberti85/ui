import type { Preview } from '@storybook/react'
import { withMode } from './decorators'

// Import Google Fonts + global base reset for all design systems
import './fonts.css'

// Import all design system token files
import '@ghiberti85/tokens/ds-minimal'
import '@ghiberti85/tokens/ds-editorial'
import '@ghiberti85/tokens/ds-brutalist'
import '@ghiberti85/tokens/ds-icc'
import '@ghiberti85/tokens/ds-dil'
import '@ghiberti85/tokens/ds-financas'

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
          { value: 'ds-icc',       title: 'ICC (Interview Command Center)' },
          { value: 'ds-dil',       title: 'DIL (DevInterviewLab)' },
          { value: 'ds-financas',  title: 'Finanças do Casal' },
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
    // Disable the built-in Storybook backgrounds addon so our CSS tokens control the bg
    backgrounds: { disable: true },
    layout: 'padded',
  },
}

export default preview
