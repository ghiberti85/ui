'use client'

import * as React from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { cn } from '../../utils/cn'
import styles from './Toast.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastItem extends ToastOptions {
  id: string
}

// ─── useToast hook ─────────────────────────────────────────────────────────────

interface UseToastReturn {
  toasts: ToastItem[]
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<UseToastReturn | null>(null)

export function useToast(): UseToastReturn {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a <Toaster />')
  return ctx
}

// ─── Radix primitives (re-exported with styles) ───────────────────────────────

export const ToastProvider = RadixToast.Provider

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(styles.viewport, className)}
    {...props}
  />
))
ToastViewport.displayName = 'ToastViewport'

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof RadixToast.Root> {
  variant?: ToastVariant
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof RadixToast.Root>,
  ToastProps
>(({ className, variant = 'default', ...props }, ref) => (
  <RadixToast.Root
    ref={ref}
    className={cn(
      styles.toast,
      styles[`toast--${variant}`],
      className
    )}
    {...props}
  />
))
Toast.displayName = 'Toast'

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className, ...props }, ref) => (
  <RadixToast.Title
    ref={ref}
    className={cn(styles.title, className)}
    {...props}
  />
))
ToastTitle.displayName = 'ToastTitle'

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>
>(({ className, ...props }, ref) => (
  <RadixToast.Description
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
))
ToastDescription.displayName = 'ToastDescription'

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof RadixToast.Action>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Action>
>(({ className, ...props }, ref) => (
  <RadixToast.Action
    ref={ref}
    className={cn(styles.action, className)}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof RadixToast.Close>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Close>
>(({ className, ...props }, ref) => (
  <RadixToast.Close
    ref={ref}
    className={cn(styles.closeButton, className)}
    aria-label="Close"
    {...props}
  >
    <span aria-hidden="true">✕</span>
  </RadixToast.Close>
))
ToastClose.displayName = 'ToastClose'

// ─── Toaster convenience component ────────────────────────────────────────────

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((options: ToastOptions): string => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...options, id }])
    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const contextValue = React.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastProvider>
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            duration={t.duration ?? 5000}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id)
            }}
          >
            <div className={styles.body}>
              <div className={styles.content}>
                {t.title && <ToastTitle>{t.title}</ToastTitle>}
                {t.description && (
                  <ToastDescription>{t.description}</ToastDescription>
                )}
              </div>
              {t.action && (
                <ToastAction
                  altText={t.action.label}
                  onClick={t.action.onClick}
                >
                  {t.action.label}
                </ToastAction>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
