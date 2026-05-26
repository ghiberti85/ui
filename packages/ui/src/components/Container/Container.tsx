import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Container.module.css'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Max-width of the container: sm=640px, md=768px, lg=1024px, xl=1280px, full=100% */
  size?: ContainerSize
  /** Polymorphic element type */
  as?: React.ElementType
}

/**
 * Container component — centers content with a max-width constraint.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Container size="lg">
 *   <p>Page content</p>
 * </Container>
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ size = 'lg', as: Comp = 'div', className, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(styles.container, styles[`size-${size}`], className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Container.displayName = 'Container'
