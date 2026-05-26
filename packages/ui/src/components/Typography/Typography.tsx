import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Typography.module.css'

// ── Heading ──────────────────────────────────────────────────────────────────

export type HeadingSize = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md'
export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Which heading element to render */
  as?: HeadingAs
  /** Maps to --typography-font-size-* tokens */
  size?: HeadingSize
}

/**
 * Heading component — renders a semantic heading element with design-system
 * font-size tokens.
 *
 * @example
 * <Heading as="h1" size="4xl">Page title</Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = 'h2', size = '2xl', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(styles.heading, styles[`heading-size-${size}`], className)}
      {...props}
    />
  )
)
Heading.displayName = 'Heading'

// ── Text ─────────────────────────────────────────────────────────────────────

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'default' | 'muted'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Which element to render */
  as?: 'p' | 'span' | 'div'
  /** Maps to --typography-font-size-* tokens */
  size?: TextSize
  /** Maps to --typography-font-weight-* tokens */
  weight?: TextWeight
  /** Maps to --color-semantic-foreground[-muted] tokens */
  color?: TextColor
}

/**
 * Text component — renders body copy with configurable size, weight and color.
 *
 * @example
 * <Text size="md" weight="regular" color="muted">Helper copy</Text>
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { as: Tag = 'p', size = 'md', weight = 'regular', color = 'default', className, ...props },
    ref
  ) => (
    <Tag
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cn(
        styles.text,
        styles[`text-size-${size}`],
        styles[`text-weight-${weight}`],
        styles[`text-color-${color}`],
        className
      )}
      {...props}
    />
  )
)
Text.displayName = 'Text'

// ── Label ────────────────────────────────────────────────────────────────────

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** When true, shows a required asterisk via CSS ::after pseudo-element */
  required?: boolean
}

/**
 * Label component — accessible form label with optional required indicator.
 * The asterisk is rendered via CSS `::after` so screen readers are not
 * affected (the field itself should carry `aria-required`).
 *
 * @example
 * <Label htmlFor="email" required>Email</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(styles.label, required && styles['label-required'], className)}
      {...props}
    />
  )
)
Label.displayName = 'Label'

// ── Code ─────────────────────────────────────────────────────────────────────

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** When true, renders as <pre><code>; when false (default) renders as inline <code> */
  block?: boolean
}

/**
 * Code component — inline or block code display.
 *
 * @example
 * <Code>const x = 1</Code>
 * <Code block>{'function hello() {\n  return "world"\n}'}</Code>
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ block = false, className, children, ...props }, ref) => {
    if (block) {
      return (
        <pre className={cn(styles['code-block'], className)}>
          <code ref={ref as React.Ref<HTMLElement>} {...props}>
            {children}
          </code>
        </pre>
      )
    }
    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        className={cn(styles['code-inline'], className)}
        {...props}
      >
        {children}
      </code>
    )
  }
)
Code.displayName = 'Code'
