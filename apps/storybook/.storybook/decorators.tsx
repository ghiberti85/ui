import React from 'react'
import type { Decorator } from '@storybook/react'

export const withMode: Decorator = (Story, context) => {
  const mode = context.globals.mode ?? 'light'
  // Set synchronously — useEffect fires after paint so Chromatic would capture
  // the wrong mode. Setting the attribute here ensures it's in place before React
  // commits to the DOM and before Chromatic takes its snapshot.
  document.documentElement.setAttribute('data-mode', mode === 'dark' ? 'dark' : '')
  return <Story />
}
