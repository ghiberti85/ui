import '@testing-library/jest-dom'
import { configureAxe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

configureAxe({
  globalOptions: {
    rules: [
      // Disable color-contrast rule — tokens aren't loaded in jsdom
      { id: 'color-contrast', enabled: false },
    ],
  },
})

// jsdom does not implement pointer capture APIs — required by Radix UI components
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.hasPointerCapture = () => false
  window.HTMLElement.prototype.setPointerCapture = () => {}
  window.HTMLElement.prototype.releasePointerCapture = () => {}
  window.HTMLElement.prototype.scrollIntoView = () => {}
}

// jsdom does not implement ResizeObserver — required by Radix UI Tooltip/Popper
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
