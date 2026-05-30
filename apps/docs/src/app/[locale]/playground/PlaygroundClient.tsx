'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Switch,
  Checkbox,
} from '@ghiberti85/ui'
import styles from './playground.module.css'

interface Labels {
  title: string
  description: string
  primaryColor: string
  background: string
  borderRadius: string
  fontSize: string
  reset: string
  copyCss: string
  copied: string
  controls: string
  preview: string
}

function getInitialColor(varName: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return val || fallback
}

export default function PlaygroundClient({ labels }: { labels: Labels }) {
  const [primary, setPrimary] = useState(() => getInitialColor('--color-semantic-primary', '#6d28d9'))
  const [background, setBackground] = useState(() => getInitialColor('--color-semantic-background', '#ffffff'))
  const [borderRadius, setBorderRadius] = useState(6)
  const [fontSize, setFontSize] = useState(16)
  const [copied, setCopied] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scope all CSS var overrides to the preview element only.
  // This prevents the Playground from polluting the global <html> style
  // and breaking dark mode on the rest of the site.
  const previewRef = useRef<HTMLElement>(null)
  const overriddenVars = useRef<Set<string>>(new Set())

  const setVar = useCallback((varName: string, value: string) => {
    const el = previewRef.current
    if (!el) return
    el.style.setProperty(varName, value)
    overriddenVars.current.add(varName)
  }, [])

  const removeVar = useCallback((varName: string) => {
    const el = previewRef.current
    if (!el) return
    el.style.removeProperty(varName)
    overriddenVars.current.delete(varName)
  }, [])

  // Apply primary color to preview
  useEffect(() => {
    if (primary) setVar('--color-semantic-primary', primary)
  }, [primary, setVar])

  // Apply background color to preview
  useEffect(() => {
    if (background) setVar('--color-semantic-background', background)
  }, [background, setVar])

  // Apply border radius (scale sm/md/lg/full proportionally) to preview
  useEffect(() => {
    const md = borderRadius
    const sm = Math.max(0, Math.round(md * 0.6))
    const lg = Math.round(md * 1.5)
    const full = 9999
    setVar('--border-radius-sm', `${sm}px`)
    setVar('--border-radius-md', `${md}px`)
    setVar('--border-radius-lg', `${lg}px`)
    setVar('--border-radius-full', `${full}px`)
  }, [borderRadius, setVar])

  // Apply font size base to preview only
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    el.style.fontSize = `${fontSize}px`
    overriddenVars.current.add('__fontSize__')
  }, [fontSize])

  const handleReset = useCallback(() => {
    const el = previewRef.current
    if (!el) return
    overriddenVars.current.forEach((v) => {
      if (v === '__fontSize__') {
        el.style.fontSize = ''
      } else {
        removeVar(v)
      }
    })
    overriddenVars.current.clear()
    setPrimary(getInitialColor('--color-semantic-primary', '#6d28d9'))
    setBackground(getInitialColor('--color-semantic-background', '#ffffff'))
    setBorderRadius(6)
    setFontSize(16)
  }, [removeVar])

  const handleCopyCss = useCallback(() => {
    const lines: string[] = []
    if (primary) lines.push(`  --color-semantic-primary: ${primary};`)
    if (background) lines.push(`  --color-semantic-background: ${background};`)
    const md = borderRadius
    const sm = Math.max(0, Math.round(md * 0.6))
    const lg = Math.round(md * 1.5)
    lines.push(`  --border-radius-sm: ${sm}px;`)
    lines.push(`  --border-radius-md: ${md}px;`)
    lines.push(`  --border-radius-lg: ${lg}px;`)
    if (fontSize !== 16) lines.push(`  /* html font-size: ${fontSize}px; */`)
    const css = `:root {\n${lines.join('\n')}\n}`
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [primary, background, borderRadius, fontSize])

  const controls = (
    <div className={styles.controls}>
      <h2 className={styles.controlsTitle}>{labels.controls}</h2>

      <div className={styles.controlGroup}>
        <label className={styles.controlLabel} htmlFor="pg-primary">{labels.primaryColor}</label>
        <div className={styles.colorRow}>
          <input
            id="pg-primary"
            type="color"
            value={primary || '#6d28d9'}
            onChange={(e) => setPrimary(e.target.value)}
            className={styles.colorInput}
          />
          <span className={styles.colorValue}>{primary}</span>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.controlLabel} htmlFor="pg-bg">{labels.background}</label>
        <div className={styles.colorRow}>
          <input
            id="pg-bg"
            type="color"
            value={background || '#ffffff'}
            onChange={(e) => setBackground(e.target.value)}
            className={styles.colorInput}
          />
          <span className={styles.colorValue}>{background}</span>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.controlLabel} htmlFor="pg-radius">
          {labels.borderRadius} — {borderRadius}px
        </label>
        <input
          id="pg-radius"
          type="range"
          min={0}
          max={24}
          value={borderRadius}
          onChange={(e) => setBorderRadius(Number(e.target.value))}
          className={styles.rangeInput}
        />
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.controlLabel} htmlFor="pg-fontsize">
          {labels.fontSize} — {fontSize}px
        </label>
        <input
          id="pg-fontsize"
          type="range"
          min={12}
          max={20}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className={styles.rangeInput}
        />
      </div>

      <div className={styles.controlActions}>
        <Button variant="secondary" size="sm" onClick={handleReset}>
          {labels.reset}
        </Button>
        <Button variant="primary" size="sm" onClick={handleCopyCss}>
          {copied ? labels.copied : labels.copyCss}
        </Button>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.description}>{labels.description}</p>
      </header>

      {/* Mobile drawer toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? '✕' : '⚙'} {labels.controls}
      </button>

      <div className={styles.layout}>
        {/* Controls panel — uses real theme vars, not overridden */}
        <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
          {controls}
        </aside>

        {/* Preview panel — CSS var overrides scoped here only */}
        <section ref={previewRef} className={styles.preview} aria-label={labels.preview}>
          <h2 className={styles.previewTitle}>{labels.preview}</h2>

          {/* Buttons */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Button</p>
            <div className={styles.previewRow}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Badge</p>
            <div className={styles.previewRow}>
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          {/* Input */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Input</p>
            <div className={styles.previewColumn}>
              <Input label="Email" placeholder="you@example.com" id="pg-input-email" />
              <Input label="Error state" placeholder="..." id="pg-input-error" error="Something went wrong." />
            </div>
          </div>

          {/* Card */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Card</p>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>A short description of the card content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card body. It reacts to token overrides in real time.</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
                <Button variant="ghost" size="sm">Cancel</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Switch & Checkbox */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Switch &amp; Checkbox</p>
            <div className={styles.previewRow}>
              <Switch id="pg-switch" checked aria-label="Toggle feature" />
              <Checkbox id="pg-check" checked aria-label="Accept terms" />
              <Checkbox id="pg-check2" aria-label="Newsletter" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
