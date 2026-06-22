'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Button,
  Badge,
  Input,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Switch,
  Checkbox,
  Alert,
  Progress,
  Spinner,
  Heading,
  Text,
} from '@ghiberti85/ui'
import styles from './playground.module.css'

const FONT_OPTIONS = [
  { value: '', label: 'Default (DM Sans)' },
  { value: 'var(--font-playfair-display)', label: 'Playfair Display' },
  { value: 'var(--font-bebas-neue)', label: 'Bebas Neue' },
  { value: 'var(--font-jetbrains-mono)', label: 'JetBrains Mono' },
] as const

interface Labels {
  title: string
  description: string
  primaryColor: string
  background: string
  foreground: string
  borderColor: string
  borderRadius: string
  fontSize: string
  spacingScale: string
  transitionSpeed: string
  fontFamily: string
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
  const [foreground, setForeground] = useState(() => getInitialColor('--color-semantic-foreground', '#0a0a0a'))
  const [borderColor, setBorderColor] = useState(() => getInitialColor('--color-semantic-border', '#e4e4e7'))
  const [borderRadius, setBorderRadius] = useState(6)
  const [fontSize, setFontSize] = useState(16)
  const [spacingScale, setSpacingScale] = useState(100)
  const [transitionSpeed, setTransitionSpeed] = useState(100)
  const [fontFamily, setFontFamily] = useState('')
  const [copied, setCopied] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  useEffect(() => { if (primary) setVar('--color-semantic-primary', primary) }, [primary, setVar])
  useEffect(() => { if (background) setVar('--color-semantic-background', background) }, [background, setVar])
  useEffect(() => { if (foreground) setVar('--color-semantic-foreground', foreground) }, [foreground, setVar])
  useEffect(() => { if (borderColor) setVar('--color-semantic-border', borderColor) }, [borderColor, setVar])

  useEffect(() => {
    const md = borderRadius
    const sm = Math.max(0, Math.round(md * 0.6))
    const lg = Math.round(md * 1.5)
    setVar('--border-radius-sm', `${sm}px`)
    setVar('--border-radius-md', `${md}px`)
    setVar('--border-radius-lg', `${lg}px`)
    setVar('--border-radius-full', '9999px')
  }, [borderRadius, setVar])

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    el.style.fontSize = `${fontSize}px`
    overriddenVars.current.add('__fontSize__')
  }, [fontSize])

  useEffect(() => {
    const scale = spacingScale / 100
    const base = 0.25
    ;[1,2,3,4,5,6,8,10,12,16,20,24].forEach((n) => {
      setVar(`--spacing-${n}`, `${(base * n * scale).toFixed(3)}rem`)
    })
  }, [spacingScale, setVar])

  useEffect(() => {
    const scale = transitionSpeed / 100
    setVar('--transition-fast', `${Math.round(100 * scale)}ms ease`)
    setVar('--transition-base', `${Math.round(200 * scale)}ms ease`)
    setVar('--transition-slow', `${Math.round(300 * scale)}ms ease`)
  }, [transitionSpeed, setVar])

  useEffect(() => {
    if (fontFamily) {
      setVar('--font-family-sans', fontFamily)
    } else {
      removeVar('--font-family-sans')
    }
  }, [fontFamily, setVar, removeVar])

  const handleReset = useCallback(() => {
    const el = previewRef.current
    if (!el) return
    overriddenVars.current.forEach((v) => {
      if (v === '__fontSize__') el.style.fontSize = ''
      else removeVar(v)
    })
    overriddenVars.current.clear()
    setPrimary(getInitialColor('--color-semantic-primary', '#6d28d9'))
    setBackground(getInitialColor('--color-semantic-background', '#ffffff'))
    setForeground(getInitialColor('--color-semantic-foreground', '#0a0a0a'))
    setBorderColor(getInitialColor('--color-semantic-border', '#e4e4e7'))
    setBorderRadius(6)
    setFontSize(16)
    setSpacingScale(100)
    setTransitionSpeed(100)
    setFontFamily('')
  }, [removeVar])

  const handleCopyCss = useCallback(() => {
    const lines: string[] = []
    if (primary) lines.push(`  --color-semantic-primary: ${primary};`)
    if (background) lines.push(`  --color-semantic-background: ${background};`)
    if (foreground) lines.push(`  --color-semantic-foreground: ${foreground};`)
    if (borderColor) lines.push(`  --color-semantic-border: ${borderColor};`)
    const md = borderRadius
    const sm = Math.max(0, Math.round(md * 0.6))
    const lg = Math.round(md * 1.5)
    lines.push(`  --border-radius-sm: ${sm}px;`)
    lines.push(`  --border-radius-md: ${md}px;`)
    lines.push(`  --border-radius-lg: ${lg}px;`)
    if (fontSize !== 16) lines.push(`  /* html { font-size: ${fontSize}px; } */`)
    if (spacingScale !== 100) {
      const scale = spacingScale / 100
      const base = 0.25
      ;[1,2,3,4,5,6,8,10,12,16,20,24].forEach((n) => {
        lines.push(`  --spacing-${n}: ${(base * n * scale).toFixed(3)}rem;`)
      })
    }
    if (transitionSpeed !== 100) {
      const scale = transitionSpeed / 100
      lines.push(`  --transition-fast: ${Math.round(100 * scale)}ms ease;`)
      lines.push(`  --transition-base: ${Math.round(200 * scale)}ms ease;`)
      lines.push(`  --transition-slow: ${Math.round(300 * scale)}ms ease;`)
    }
    if (fontFamily) lines.push(`  --font-family-sans: ${fontFamily};`)
    const css = `:root {\n${lines.join('\n')}\n}`
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [primary, background, foreground, borderColor, borderRadius, fontSize, spacingScale, transitionSpeed, fontFamily])

  const controls = (
    <div className={styles.controls}>
      <h2 className={styles.controlsTitle}>{labels.controls}</h2>

      <div className={styles.controlSection}>
        <p className={styles.controlSectionLabel}>Colors</p>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-primary">{labels.primaryColor}</label>
          <div className={styles.colorRow}>
            <input id="pg-primary" type="color" value={primary || '#6d28d9'}
              onChange={(e) => setPrimary(e.target.value)} className={styles.colorInput} />
            <span className={styles.colorValue}>{primary}</span>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-bg">{labels.background}</label>
          <div className={styles.colorRow}>
            <input id="pg-bg" type="color" value={background || '#ffffff'}
              onChange={(e) => setBackground(e.target.value)} className={styles.colorInput} />
            <span className={styles.colorValue}>{background}</span>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-fg">{labels.foreground}</label>
          <div className={styles.colorRow}>
            <input id="pg-fg" type="color" value={foreground || '#0a0a0a'}
              onChange={(e) => setForeground(e.target.value)} className={styles.colorInput} />
            <span className={styles.colorValue}>{foreground}</span>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-border-color">{labels.borderColor}</label>
          <div className={styles.colorRow}>
            <input id="pg-border-color" type="color" value={borderColor || '#e4e4e7'}
              onChange={(e) => setBorderColor(e.target.value)} className={styles.colorInput} />
            <span className={styles.colorValue}>{borderColor}</span>
          </div>
        </div>
      </div>

      <div className={styles.controlSection}>
        <p className={styles.controlSectionLabel}>Shape &amp; Scale</p>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-radius">
            {labels.borderRadius} — {borderRadius}px
          </label>
          <input id="pg-radius" type="range" min={0} max={24} value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))} className={styles.rangeInput} />
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-spacing">
            {labels.spacingScale} — {spacingScale}%
          </label>
          <input id="pg-spacing" type="range" min={50} max={150} step={5} value={spacingScale}
            onChange={(e) => setSpacingScale(Number(e.target.value))} className={styles.rangeInput} />
        </div>
      </div>

      <div className={styles.controlSection}>
        <p className={styles.controlSectionLabel}>Typography</p>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-fontsize">
            {labels.fontSize} — {fontSize}px
          </label>
          <input id="pg-fontsize" type="range" min={12} max={20} value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))} className={styles.rangeInput} />
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-font">{labels.fontFamily}</label>
          <select id="pg-font" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}
            className={styles.selectInput}>
            {FONT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.controlSection}>
        <p className={styles.controlSectionLabel}>Motion</p>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="pg-transition">
            {labels.transitionSpeed} — {transitionSpeed}%
          </label>
          <input id="pg-transition" type="range" min={0} max={300} step={10} value={transitionSpeed}
            onChange={(e) => setTransitionSpeed(Number(e.target.value))} className={styles.rangeInput} />
        </div>
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

      <button className={styles.mobileToggle} onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen}>
        {mobileOpen ? '✕' : '⚙'} {labels.controls}
      </button>

      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
          {controls}
        </aside>

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
            <div className={styles.previewRow}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
            </div>
          </div>

          {/* Typography */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Typography</p>
            <div className={styles.previewColumn}>
              <Heading as="h2" size="2xl">Display Heading</Heading>
              <Heading as="h3" size="lg">Section Heading</Heading>
              <Text size="md">Body text — The quick brown fox jumps over the lazy dog.</Text>
              <Text size="sm" color="muted">Small muted text — used for captions and secondary info.</Text>
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

          {/* Progress & Spinner */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Progress &amp; Spinner</p>
            <div className={styles.previewColumn}>
              <Progress value={65} variant="default" />
              <Progress value={40} variant="success" />
              <Progress value={80} variant="warning" />
            </div>
            <div className={styles.previewRow}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" variant="secondary" />
            </div>
          </div>

          {/* Alert */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Alert</p>
            <div className={styles.previewColumn}>
              <Alert variant="info" title="Info">This is an informational message.</Alert>
              <Alert variant="success" title="Success">Your changes were saved successfully.</Alert>
              <Alert variant="warning" title="Warning">Please review before continuing.</Alert>
              <Alert variant="error" title="Error">Something went wrong. Try again.</Alert>
            </div>
          </div>

          {/* Form inputs */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Input &amp; Textarea</p>
            <div className={styles.previewColumn}>
              <Input label="Email" placeholder="you@example.com" id="pg-input-email" />
              <Input label="Error state" placeholder="..." id="pg-input-error" error="Something went wrong." />
              <Textarea label="Message" placeholder="Write your message…" id="pg-textarea" rows={3} />
            </div>
          </div>

          {/* Select */}
          <div className={styles.previewGroup}>
            <p className={styles.previewGroupLabel}>Select</p>
            <div className={styles.previewColumn}>
              <Select
                label="Design System"
                id="pg-select"
                options={[
                  { value: 'ds-clean', label: 'Clean' },
                  { value: 'ds-velvet', label: 'Velvet' },
                  { value: 'ds-brutalist', label: 'Brutalist' },
                  { value: 'ds-editorial', label: 'Editorial' },
                  { value: 'ds-onyx', label: 'Onyx' },
                  { value: 'ds-aurum', label: 'Aurum' },
                  { value: 'ds-neon', label: 'Neon' },
                  { value: 'ds-nature', label: 'Nature' },
                  { value: 'ds-swiss', label: 'Swiss' },
                ]}
              />
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
                <Text size="md">This is the card body. It reacts to token overrides in real time.</Text>
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
