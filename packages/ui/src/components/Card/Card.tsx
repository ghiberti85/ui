import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card component — compound component with sub-components for layout.
 *
 * @example
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Content</Card.Content>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  )
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.header, className)} {...props}>
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn(styles.title, className)} {...props}>
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn(styles.description, className)} {...props}>
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.content, className)} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.footer, className)} {...props}>
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

type CardComponent = typeof Card & {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

const CardWithSubComponents = Card as CardComponent
CardWithSubComponents.Header = CardHeader
CardWithSubComponents.Title = CardTitle
CardWithSubComponents.Description = CardDescription
CardWithSubComponents.Content = CardContent
CardWithSubComponents.Footer = CardFooter

export { CardWithSubComponents as CardCompound }
