import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Card.module.css'

export type CardVariant = 'default' | 'elevated' | 'ghost' | 'filled'
export type CardOrientation = 'vertical' | 'horizontal'
export type CardImageAspectRatio = '16/9' | '4/3' | '1/1' | '3/4'
export type CardImagePosition = 'top' | 'left' | 'right' | 'background'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  orientation?: CardOrientation
  hoverable?: boolean
}

export interface CardImageProps {
  src: string
  alt: string
  aspectRatio?: CardImageAspectRatio
  position?: CardImagePosition
  className?: string
}

const ASPECT_RATIO_MAP: Record<CardImageAspectRatio, string> = {
  '16/9': '56.25%',
  '4/3':  '75%',
  '1/1':  '100%',
  '3/4':  '133.33%',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', orientation = 'vertical', hoverable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles.card,
        styles[`variant-${variant}`],
        orientation === 'horizontal' && styles.horizontal,
        hoverable && styles.hoverable,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = 'Card'

export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = '16/9', position = 'top', className }, ref) => {
    if (position === 'background') {
      return (
        <div ref={ref} className={cn(styles.imageBg, className)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className={styles.imageBgImg} aria-hidden="true" />
        </div>
      )
    }

    const paddingTop = ASPECT_RATIO_MAP[aspectRatio]
    return (
      <div
        ref={ref}
        className={cn(styles.imageWrapper, styles[`imagePos-${position}`], className)}
        style={{ paddingTop: position === 'top' ? paddingTop : undefined }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.image} />
      </div>
    )
  }
)
CardImage.displayName = 'CardImage'

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
  Image: typeof CardImage
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

const CardWithSubComponents = Card as CardComponent
CardWithSubComponents.Image = CardImage
CardWithSubComponents.Header = CardHeader
CardWithSubComponents.Title = CardTitle
CardWithSubComponents.Description = CardDescription
CardWithSubComponents.Content = CardContent
CardWithSubComponents.Footer = CardFooter

export { CardWithSubComponents as CardCompound }
