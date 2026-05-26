import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/cn'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant
  /** Size of the button */
  size?: ButtonSize
  /**
   * When true, renders the button as its child element (useful for links, etc.)
   * Powered by Radix UI Slot.
   */
  asChild?: boolean
  /** Shows a loading spinner and disables the button */
  loading?: boolean
}

/**
 * Button component — hybrid styled + headless.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button asChild><a href="/about">About</a></Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      asChild = false,
      loading = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span aria-hidden="true" style={{ display: 'inline-block', width: '1em', height: '1em', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
