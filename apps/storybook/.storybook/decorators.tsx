import React, { useEffect } from 'react'
import type { Decorator } from '@storybook/react'

export const withMode: Decorator = (Story, context) => {
  const mode = context.globals.mode ?? 'light'
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    return () => {
      document.documentElement.removeAttribute('data-mode')
    }
  }, [mode])
  return <Story />
}
