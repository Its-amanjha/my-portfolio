'use client'

import { useEffect, useRef, useState } from 'react'

export default function ExpertiseCardAnimation({ index, title, animationType }: { index: number; title?: string; animationType?: string }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const update = () => setIsDarkMode(document.documentElement.classList.contains('dark-mode'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const resolvedType = animationType || ''

  if (resolvedType === 'coding') return <AgenticCodingAnimation isDarkMode={isDarkMode} />
  if (resolvedType === 'workflow') return <AIWorkflowsAnimation isDarkMode={isDarkMode} />
  if (resolvedType === 'fullstack') return <FullStackAIAnimation isDarkMode={isDarkMode} />
  if (resolvedType === 'gtm') return <GTMTechAnimation isDarkMode={isDarkMode} />
  if (resolvedType === 'seo') return <ProgrammaticSEOAnimation isDarkMode={isDarkMode} />
  if (resolvedType === 'cognitive') return <CognitiveAutomationAnimation isDarkMode={isDarkMode} />

  const normalizedTitle = (title || '').toLowerCase()

  if (
    normalizedTitle.includes('agentic') ||
    normalizedTitle.includes('coding') ||
    normalizedTitle.includes('multi-agent')
  ) {
    return <AgenticCodingAnimation isDarkMode={isDarkMode} />
  }
  if (
    normalizedTitle.includes('workflow') ||
    normalizedTitle.includes('orchestration') ||
    normalizedTitle.includes('llm')
  ) {
    return <AIWorkflowsAnimation isDarkMode={isDarkMode} />
  }
  if (
    normalizedTitle.includes('full-stack') ||
    normalizedTitle.includes('app') ||
    normalizedTitle.includes('web')
  ) {
    return <FullStackAIAnimation isDarkMode={isDarkMode} />
  }
  if (
    normalizedTitle.includes('gtm') ||
    normalizedTitle.includes('growth') ||
    normalizedTitle.includes('funnel') ||
    normalizedTitle.includes('marketing')
  ) {
    return <GTMTechAnimation isDarkMode={isDarkMode} />
  }
  if (
    normalizedTitle.includes('seo') ||
    normalizedTitle.includes('content') ||
    normalizedTitle.includes('programmatic')
  ) {
    return <ProgrammaticSEOAnimation isDarkMode={isDarkMode} />
  }
  if (
    normalizedTitle.includes('cognitive') ||
    normalizedTitle.includes('parsing') ||
    normalizedTitle.includes('document') ||
    normalizedTitle.includes('automation')
  ) {
    return <CognitiveAutomationAnimation isDarkMode={isDarkMode} />
  }

  // Index fallback
  const anims = [
    <AgenticCodingAnimation key="0" isDarkMode={isDarkMode} />,
    <AIWorkflowsAnimation key="1" isDarkMode={isDarkMode} />,
    <FullStackAIAnimation key="2" isDarkMode={isDarkMode} />,
    <GTMTechAnimation key="3" isDarkMode={isDarkMode} />,
    <ProgrammaticSEOAnimation key="4" isDarkMode={isDarkMode} />,
    <CognitiveAutomationAnimation key="5" isDarkMode={isDarkMode} />,
  ]
  return anims[index % anims.length]
}

/* ─── 1. Agentic Coding & Multi-Agent Systems ─── */
function AgenticCodingAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const [editorLines, setEditorLines] = useState<string[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [stage, setStage] = useState<'IDLE' | 'ANALYZING' | 'CODING_V1' | 'RUNNING_TESTS_V1' | 'CRITIC' | 'CODING_V2' | 'RUNNING_TESTS_V2' | 'MERGING'>('ANALYZING')

  useEffect(() => {
    let active = true
    let timeouts: ReturnType<typeof setTimeout>[] = []

    const registerTimeout = (fn: () => void, ms: number) => {
      if (active) timeouts.push(setTimeout(fn, ms))
    }

    const runCycle = () => {
      if (!active) return
      setEditorLines([])
      setLogs([])
      setStage('ANALYZING')
      setLogs(['[SYSTEM] Initializing multi-agent session...', '[PLANNER] Issue: NameError in parser'])

      registerTimeout(() => {
        setStage('CODING_V1')
        setLogs(prev => [...prev, '[AGENT:CODER] Writing fix...'])
        setEditorLines(['def run(self, issue):', '    res = parse(issue)', '    return res'])
      }, 1500)

      registerTimeout(() => {
        setStage('RUNNING_TESTS_V1')
        setLogs(prev => [...prev, '[SYSTEM] Running pytest...', "FAIL: test_ast (NameError: name 'parse' is not defined)"])
      }, 3500)

      registerTimeout(() => {
        setStage('CRITIC')
        setLogs(prev => [...prev, "[AGENT:CRITIC] Found bug: global name 'parse' is undefined.", "[AGENT:CRITIC] Suggest calling 'issue.parse()' instead."])
      }, 5500)

      registerTimeout(() => {
        setStage('CODING_V2')
        setLogs(prev => [...prev, '[AGENT:CODER] Re-writing code with critique recommendations...'])
        setEditorLines(['def run(self, issue):', '    res = issue.parse()', '    return res'])
      }, 7500)

      registerTimeout(() => {
        setStage('RUNNING_TESTS_V2')
        setLogs(prev => [...prev, '[SYSTEM] Re-running pytest...', '✓ test_ast: PASSED', '✓ test_codegen: PASSED', '[✓] ALL TESTS PASSED'])
      }, 9500)

      registerTimeout(() => {
        setStage('MERGING')
        setLogs(prev => [...prev, '[SYSTEM] Creating Pull Request...', '[SYSTEM] Auto-merging to main branch...'])
      }, 11500)

      // Restart cycle
      registerTimeout(() => {
        runCycle()
      }, 14500)
    }

    runCycle()

    return () => {
      active = false
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-5 bg-black text-[7px] font-mono select-none p-2 gap-1.5 border border-neo-border">
      {/* Code Editor */}
      <div className="col-span-3 border-r border-gray-800 pr-1.5 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center gap-1 border-b border-gray-800 pb-1 mb-1 opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[6.5px] text-gray-400 font-bold">workspace/parser_agent.py</span>
          </div>
          <div className="flex flex-col gap-0.5 min-h-[70px] leading-relaxed">
            {editorLines.map((line, idx) => (
              <div key={idx} className="flex">
                <span className="text-gray-600 mr-2 select-none w-2 inline-block text-right">{idx + 1}</span>
                <span className="text-green-400 font-bold">{line}</span>
              </div>
            ))}
            {stage.startsWith('CODING') && (
              <span className="w-1 h-3 bg-neo-pink animate-pulse inline-block" />
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-1 flex items-center justify-between text-[6px]">
          <span className="text-gray-500">Lines: {editorLines.length}</span>
          <span className={`px-1 py-0.5 rounded font-black text-black ${
            stage.startsWith('RUNNING_TESTS') ? 'bg-yellow-500 animate-pulse' :
            stage === 'CRITIC' ? 'bg-neo-pink' :
            stage === 'MERGING' ? 'bg-neo-lime' : 'bg-neo-blue'
          }`}>{stage}</span>
        </div>
      </div>

      {/* Coder Logs */}
      <div className="col-span-2 pl-1.5 flex flex-col justify-between bg-gray-950 overflow-hidden text-gray-300">
        <div>
          <div className="font-extrabold text-[7px] border-b border-gray-800 pb-0.5 uppercase opacity-60 text-neo-blue">Telemetry Logs</div>
          <div className="mt-1 flex flex-col gap-1 max-h-[85px] overflow-hidden leading-normal">
            {logs.slice(-6).map((log, idx) => {
              const color = log.includes('FAIL') ? 'text-red-500 font-bold' :
                            log.includes('PASSED') || log.includes('[✓]') ? 'text-green-400 font-bold' :
                            log.includes('CRITIC') ? 'text-neo-pink' :
                            log.includes('CODER') ? 'text-cyan-400' : 'text-gray-400'
              return (
                <div key={idx} className={`${color} break-all`}>
                  {log}
                </div>
              )
            })}
          </div>
        </div>

        {stage === 'MERGING' && (
          <div className="bg-neo-lime text-[6px] font-black py-0.5 text-center text-black rounded animate-pulse">
            ✓ PR #142 MERGED
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── 2. AI Workflows & LLM Orchestration ─── */
function AIWorkflowsAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let frame = 0

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rectWidth = canvas.parentElement?.offsetWidth || 220
      const rectHeight = canvas.parentElement?.offsetHeight || 130
      canvas.width = rectWidth * dpr
      canvas.height = rectHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = [
      { id: 'in', x: 25, y: 65, label: 'INPUT', color: '#FFE135', pulse: 0, status: 'IDLE' },
      { id: 'route', x: 75, y: 65, label: 'CLASSIFIER', color: '#4ECDC4', pulse: 0, status: 'IDLE' },
      { id: 'rag', x: 130, y: 30, label: 'RAG SEARCH', color: '#C77DFF', pulse: 0, status: 'IDLE' },
      { id: 'tool', x: 130, y: 100, label: 'API SEARCH', color: '#FF6B35', pulse: 0, status: 'IDLE' },
      { id: 'llm', x: 185, y: 65, label: 'LLM CORE', color: '#95E06C', pulse: 0, status: 'IDLE' },
      { id: 'out', x: 235, y: 65, label: 'OUTPUT', color: '#FF6B9D', pulse: 0, status: 'IDLE' }
    ]

    const connections = [
      { from: 'in', to: 'route', path: 'in' },
      { from: 'route', to: 'rag', path: 'top' },
      { from: 'route', to: 'tool', path: 'bottom' },
      { from: 'rag', to: 'llm', path: 'top_merge' },
      { from: 'tool', to: 'llm', path: 'bottom_merge' },
      { from: 'llm', to: 'out', path: 'out' }
    ]

    class FlowParticle {
      fromNode: any
      toNode: any
      path: string
      progress: number
      speed: number
      color: string

      constructor(from: any, to: any, path: string, color: string) {
        this.fromNode = from
        this.toNode = to
        this.path = path
        this.progress = 0
        this.speed = 0.015 + Math.random() * 0.01
        this.color = color
      }

      update() {
        this.progress += this.speed
        if (this.progress >= 1) {
          this.progress = 0
          this.toNode.pulse = 1.0
          this.toNode.status = 'ACTIVE'
          setTimeout(() => {
            if (this.toNode) this.toNode.status = 'IDLE'
          }, 800)
        }
      }

      draw(cCtx: CanvasRenderingContext2D) {
        let x = 0, y = 0
        const p = this.progress
        const x1 = this.fromNode.x, y1 = this.fromNode.y
        const x2 = this.toNode.x, y2 = this.toNode.y

        if (this.path === 'in' || this.path === 'out') {
          x = x1 + (x2 - x1) * p
          y = y1
        } else if (this.path === 'top' || this.path === 'top_merge') {
          const cx = x1 + (x2 - x1) / 2
          const cy = Math.min(y1, y2) - 8
          x = (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * cx + p * p * x2
          y = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * cy + p * p * y2
        } else {
          const cx = x1 + (x2 - x1) / 2
          const cy = Math.max(y1, y2) + 8
          x = (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * cx + p * p * x2
          y = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * cy + p * p * y2
        }

        cCtx.beginPath()
        cCtx.arc(x, y, 2.5, 0, Math.PI * 2)
        cCtx.fillStyle = this.color
        cCtx.shadowColor = this.color
        cCtx.shadowBlur = 4
        cCtx.fill()
        cCtx.shadowBlur = 0
      }
    }

    const findNode = (id: string) => nodes.find(n => n.id === id)
    const particles = [
      new FlowParticle(findNode('in'), findNode('route'), 'in', '#FFE135'),
      new FlowParticle(findNode('route'), findNode('rag'), 'top', '#C77DFF'),
      new FlowParticle(findNode('route'), findNode('tool'), 'bottom', '#FF6B35'),
      new FlowParticle(findNode('rag'), findNode('llm'), 'top_merge', '#95E06C'),
      new FlowParticle(findNode('tool'), findNode('llm'), 'bottom_merge', '#95E06C'),
      new FlowParticle(findNode('llm'), findNode('out'), 'out', '#FF6B9D')
    ]

    function draw() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      frame++

      const dx = w / 2 - 130
      ctx.save()
      ctx.translate(dx, 0)

      connections.forEach(conn => {
        const from = findNode(conn.from)
        const to = findNode(conn.to)
        if (!from || !to) return
        ctx.strokeStyle = isDarkMode ? '#222' : '#ddd'
        ctx.beginPath()
        if (conn.path === 'in' || conn.path === 'out') {
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
        } else if (conn.path.startsWith('top')) {
          ctx.moveTo(from.x, from.y)
          ctx.quadraticCurveTo(from.x + (to.x - from.x) / 2, Math.min(from.y, to.y) - 8, to.x, to.y)
        } else {
          ctx.moveTo(from.x, from.y)
          ctx.quadraticCurveTo(from.x + (to.x - from.x) / 2, Math.max(from.y, to.y) + 8, to.x, to.y)
        }
        ctx.stroke()
      })

      particles.forEach(p => {
        p.update()
        p.draw(ctx)
      })

      nodes.forEach(n => {
        if (n.pulse > 0) {
          ctx.strokeStyle = n.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, 14 + (1.0 - n.pulse) * 16, 0, Math.PI * 2)
          ctx.stroke()
          n.pulse -= 0.05
        }

        ctx.fillStyle = 'black'
        ctx.fillRect(n.x - 22, n.y - 10, 44, 20)

        ctx.fillStyle = isDarkMode ? '#111' : '#fff'
        ctx.strokeStyle = n.status === 'ACTIVE' ? n.color : '#000000'
        ctx.lineWidth = n.status === 'ACTIVE' ? 2 : 1.2
        ctx.strokeRect(n.x - 24, n.y - 12, 48, 24)
        ctx.fillRect(n.x - 24, n.y - 12, 48, 24)

        ctx.fillStyle = n.color
        ctx.fillRect(n.x - 24, n.y - 12, 48, 3)

        ctx.font = 'bold 5px monospace'
        ctx.fillStyle = isDarkMode ? '#fff' : '#000'
        ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y + 2)

        if (n.id === 'route') {
          ctx.font = '4.5px monospace'
          ctx.fillStyle = '#777'
          ctx.fillText('99% CONF', n.x, n.y + 19)
        } else if (n.id === 'llm') {
          ctx.font = '4.5px monospace'
          ctx.fillStyle = '#777'
          ctx.fillText('Tokens: 4.8k', n.x, n.y + 19)
        }
      })

      ctx.restore()
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isDarkMode])

  return (
    <div className="w-full h-full bg-black overflow-hidden relative flex items-center justify-center border border-neo-border">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

/* ─── 3. Full-Stack AI Application Development ─── */
function FullStackAIAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [messages] = useState<string[]>([
    'User: "Build an invoice page"',
    'AI: Thinking...',
    'AI: Generating React bundle...',
    'System: Deploy completed!'
  ])
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rectWidth = canvas.parentElement?.offsetWidth || 130
      const rectHeight = canvas.parentElement?.offsetHeight || 36
      canvas.width = rectWidth * dpr
      canvas.height = rectHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = '#222'
      ctx.lineWidth = 0.5
      const gridSize = 8
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      const waves = [
        { stroke: 'rgba(6,182,212,0.85)', amp: 8, freq: 0.05, speed: t },
        { stroke: 'rgba(236,72,153,0.7)', amp: 6, freq: 0.08, speed: -t * 1.2 },
        { stroke: 'rgba(149,224,108,0.6)', amp: 4, freq: 0.03, speed: t * 0.5 }
      ]

      waves.forEach(wConfig => {
        ctx.beginPath()
        ctx.lineWidth = 1.3
        ctx.strokeStyle = wConfig.stroke
        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin(x * wConfig.freq + wConfig.speed) * wConfig.amp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      t += 0.065
      animId = requestAnimationFrame(draw)
    }
    draw()

    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % messages.length)
    }, 2500)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [messages.length])

  return (
    <div className="w-full h-full grid grid-cols-5 bg-black text-[7.2px] font-mono select-none p-2 gap-1.5 border border-neo-border text-white">
      <div className="col-span-3 flex flex-col justify-between overflow-hidden">
        <div className="h-[46px] border border-gray-800 bg-gray-950 rounded shadow-neo-sm relative overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <span className="absolute top-0.5 left-1 text-[5px] text-cyan-400 uppercase tracking-widest animate-pulse font-extrabold">Websocket Stream</span>
        </div>
        <div className="border border-gray-800 bg-neo-yellow text-black font-black p-1 rounded text-[7px] truncate">
          🤖 {messages[msgIdx]}
        </div>
      </div>

      <div className="col-span-2 flex flex-col justify-between bg-gray-950 p-1 border border-gray-800 rounded overflow-hidden">
        <div className="space-y-0.5">
          <div className="font-bold text-[6px] border-b border-gray-800 pb-0.5 opacity-60 text-neo-pink">SYSTEM STATUS</div>
          <div>Port: <span className="text-gray-400">localhost:3000</span></div>
          <div>Ping: <span className="text-neo-lime font-black">12ms</span></div>
          <div>HMR: <span className="text-neo-pink font-bold">active</span></div>
        </div>
        <div className="h-4 w-full flex items-end gap-0.5 border border-gray-800 p-0.5 bg-black rounded">
          {[20, 50, 30, 80, 15, 60, 45, 90].map((val, idx) => (
            <div
              key={idx}
              className="flex-grow bg-neo-blue"
              style={{
                height: `${val}%`,
                animation: 'barCycle 1s ease-in-out infinite alternate',
                animationDelay: `${idx * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes barCycle {
          0% { transform: scaleY(0.6); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

/* ─── 4. GTM Tech Stack & Growth Engineering ─── */
function GTMTechAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [conversions, setConversions] = useState(1842)
  const [logs, setLogs] = useState<string[]>([
    '[STRIPE] Charge $99 paid',
    '[HUBSPOT] Lead converted',
    '[AMPLITUDE] track: Upgrade'
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const dataPoints = [12, 18, 15, 25, 22, 35, 28, 48]
    let offset = 0

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rectWidth = canvas.parentElement?.offsetWidth || 130
      const rectHeight = canvas.parentElement?.offsetHeight || 36
      canvas.width = rectWidth * dpr
      canvas.height = rectHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = '#222'
      ctx.lineWidth = 0.5
      const gridSize = 6
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#95E06C'

      const step = w / (dataPoints.length - 1)
      dataPoints.forEach((val, idx) => {
        const x = idx * step
        const wave = Math.sin(idx + offset) * 3
        const y = h - ((val + wave) / 60) * h - 4
        if (idx === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.fillStyle = 'rgba(149,224,108,0.08)'
      ctx.fill()

      offset += 0.05
      animId = requestAnimationFrame(draw)
    }
    draw()

    const interval = setInterval(() => {
      setConversions(prev => prev + Math.floor(Math.random() * 2) + 1)
      const events = [
        '[STRIPE] Charge $49 paid',
        '[HUBSPOT] Sync: deal updated',
        '[AMPLITUDE] track: Onboarding complete',
        '[SLACK] Alert: deal won! 🎉',
        '[STRIPE] Charge $199 paid'
      ]
      const randEvent = events[Math.floor(Math.random() * events.length)]
      setLogs(prev => [...prev.slice(-2), randEvent])
    }, 3000)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-5 bg-black text-[7.2px] font-mono select-none p-2 gap-1.5 border border-neo-border text-white">
      <div className="col-span-3 flex flex-col justify-between overflow-hidden">
        <div className="h-[46px] border border-gray-800 bg-gray-950 rounded shadow-neo-sm relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <span className="absolute top-0.5 left-1 text-[5px] text-neo-lime uppercase tracking-widest font-extrabold">Conversion Analytics</span>
        </div>
        <div className="flex flex-col gap-0.5 bg-gray-950 border border-gray-800 p-1 rounded font-bold">
          {logs.map((log, idx) => (
            <div key={idx} className="truncate text-[6px] text-cyan-400">
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col justify-between bg-gray-950 p-1.5 border border-gray-800 rounded shadow-neo-sm">
        <div className="space-y-1 text-center">
          <div className="font-extrabold text-[7px] uppercase border-b border-gray-800 pb-0.5 opacity-60 text-neo-yellow">GROWTH Telemetry</div>
          <div>
            <div className="opacity-80 text-[5.8px]">LTV: $14,920</div>
            <div className="opacity-80 text-[5.8px]">CAC: $18.40</div>
          </div>
          <div className="border-t border-gray-900 pt-1">
            <div className="opacity-70 text-[5.5px]">CONVERSIONS</div>
            <div className="font-black text-xs text-neo-lime animate-pulse">{conversions}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 5. Programmatic SEO & Content Engines ─── */
function ProgrammaticSEOAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = useState('')
  const [sitemapGrid, setSitemapGrid] = useState<string[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let offset = 0

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rectWidth = canvas.parentElement?.offsetWidth || 130
      const rectHeight = canvas.parentElement?.offsetHeight || 36
      canvas.width = rectWidth * dpr
      canvas.height = rectHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = '#222'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += 10) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#ff6b35'

      for (let x = 0; x < w; x++) {
        const factor = x / w
        const y = h - Math.pow(factor, 3) * (h - 8) - 4 + Math.sin(x * 0.08 + offset) * 1.5
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      offset += 0.05
      animId = requestAnimationFrame(draw)
    }
    draw()

    const urls = [
      'aman.dev/seo/ai-workflows-marketing',
      'aman.dev/seo/multi-agent-developer-leads',
      'aman.dev/seo/dubai-growth-automation-consult',
      'aman.dev/seo/programmatic-content-pipelines'
    ]
    let uIdx = 0
    let charIdx = 0
    let state: 'typing' | 'indexing' | 'wait' = 'typing'

    const interval = setInterval(() => {
      if (state === 'typing') {
        const targetUrl = urls[uIdx]
        if (charIdx <= targetUrl.length) {
          setUrl(targetUrl.substring(0, charIdx))
          charIdx++
        } else {
          state = 'indexing'
        }
      } else if (state === 'indexing') {
        setSitemapGrid(prev => {
          const newItem = `GRID_${Math.floor(Math.random() * 100)}`
          if (prev.length < 9) {
            return [...prev, newItem]
          } else {
            return [newItem]
          }
        })
        state = 'wait'
      } else if (state === 'wait') {
        setTimeout(() => {
          setUrl('')
          charIdx = 0
          uIdx = (uIdx + 1) % urls.length
          state = 'typing'
        }, 1500)
      }
    }, 110)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-5 bg-black text-[7.2px] font-mono select-none p-2 gap-1.5 border border-neo-border text-white">
      <div className="col-span-3 flex flex-col justify-between overflow-hidden">
        <div className="border border-gray-800 bg-white text-black p-1 font-bold flex items-center gap-1 rounded shadow-neo-sm truncate">
          <span className="text-[6.5px]">🔗</span>
          <span className="truncate text-[6px]">{url}</span>
          <span className="w-0.5 h-2 bg-black animate-pulse" />
        </div>
        <div className="grid grid-cols-5 gap-1 bg-gray-950 p-1 border border-gray-800 rounded min-h-[35px] items-center">
          {Array(10).fill(null).map((_, idx) => {
            const isActive = idx < sitemapGrid.length
            return (
              <div
                key={idx}
                className={`h-2.5 rounded transition-all duration-300 ${
                  isActive ? 'bg-neo-lime border border-neo-lime shadow-[0_0_4px_#95E06C]' : 'bg-gray-800 border border-gray-900'
                }`}
              />
            )
          })}
        </div>
      </div>

      <div className="col-span-2 flex flex-col justify-between bg-gray-950 p-1 border border-gray-800 rounded shadow-neo-sm relative overflow-hidden">
        <div className="h-[34px] w-full relative">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
        <div className="text-[5.5px] text-neo-orange font-bold text-center border-t border-gray-900 pt-0.5 flex justify-between px-1">
          <span>TRAFFIC INDEX</span>
          <span className="text-green-500 font-extrabold">+184%</span>
        </div>
      </div>
    </div>
  )
}

/* ─── 6. Cognitive Automation & Document Parsing ─── */
function CognitiveAutomationAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [extracted, setExtracted] = useState<Record<string, string>>({})
  const [confidence, setConfidence] = useState(99.4)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let scanY = 0
    let dir = 1

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rectWidth = canvas.parentElement?.offsetWidth || 80
      const rectHeight = canvas.parentElement?.offsetHeight || 130
      canvas.width = rectWidth * dpr
      canvas.height = rectHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const fields = [
      { y: 15, h: 8, label: 'VENDOR', active: false, color: '#C77DFF' },
      { y: 40, h: 10, label: 'TOTAL', active: false, color: '#FF6B9D' },
      { y: 70, h: 8, label: 'STATUS', active: false, color: '#95E06C' }
    ]

    function draw() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = '#fff'
      ctx.strokeStyle = '#222'
      ctx.lineWidth = 1.5
      ctx.fillRect(4, 4, w - 8, h - 8)
      ctx.strokeRect(4, 4, w - 8, h - 8)

      ctx.fillStyle = '#ddd'
      ctx.fillRect(8, 12, w - 16, 2)
      ctx.fillRect(8, 28, w - 24, 2)
      ctx.fillRect(8, 36, w - 16, 2)
      ctx.fillRect(8, 54, w - 20, 2)
      ctx.fillRect(8, 62, w - 16, 2)

      scanY += 0.85 * dir
      if (scanY > h - 10 || scanY < 6) {
        dir *= -1
      }

      fields.forEach(field => {
        const isIntersect = scanY >= field.y && scanY <= field.y + field.h
        field.active = isIntersect

        ctx.strokeStyle = isIntersect ? field.color : '#eee'
        ctx.fillStyle = isIntersect ? `${field.color}20` : 'transparent'
        ctx.lineWidth = isIntersect ? 1.5 : 0.8
        ctx.fillRect(8, field.y, w - 16, field.h)
        ctx.strokeRect(8, field.y, w - 16, field.h)

        if (isIntersect) {
          ctx.fillStyle = field.color
          ctx.font = 'bold 4.5px monospace'
          ctx.fillText(`[OCR: ${field.label}]`, 10, field.y - 2)
        }
      })

      ctx.strokeStyle = '#FF6B9D'
      ctx.lineWidth = 1.2
      ctx.shadowColor = '#FF6B9D'
      ctx.shadowBlur = 5
      ctx.beginPath()
      ctx.moveTo(4, scanY)
      ctx.lineTo(w - 4, scanY)
      ctx.stroke()
      ctx.shadowBlur = 0

      animId = requestAnimationFrame(draw)
    }
    draw()

    const states: Record<string, string>[] = [
      {},
      { "vendor": "ApexCorp" },
      { "vendor": "ApexCorp", "total": "$1,240.00" },
      { "vendor": "ApexCorp", "total": "$1,240.00", "status": "APPROVED" }
    ]
    let idx = 0
    const interval = setInterval(() => {
      setExtracted(states[idx])
      setConfidence(98.2 + Math.random() * 1.5)
      idx = (idx + 1) % states.length
    }, 1600)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-5 bg-black text-[7.2px] font-mono select-none p-2 gap-1.5 border border-neo-border text-white">
      <div className="col-span-2 relative overflow-hidden flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="col-span-3 font-mono text-[6.5px] font-bold border border-gray-800 bg-gray-950 p-2 rounded shadow-neo-sm flex flex-col justify-between text-gray-300 leading-relaxed overflow-hidden">
        <div>
          <div className="font-extrabold text-[7px] uppercase border-b border-gray-800 pb-0.5 mb-1 opacity-60 text-neo-purple">Cognitive Parser</div>
          <div className="text-neo-blue">{"{"}</div>
          {Object.entries(extracted).map(([k, v]) => (
            <div key={k} className="pl-2.5 truncate">
              &quot;{k}&quot;: <span className={k === 'status' ? 'text-green-400 font-extrabold' : 'text-neo-orange'}>&quot;{v}&quot;</span>
            </div>
          ))}
          <div className="text-neo-blue">{"}"}</div>
        </div>
        <div className="border-t border-gray-900 pt-1 text-[5.5px] flex justify-between items-center text-gray-500">
          <span>Confidence</span>
          <span className="text-neo-lime font-black">{confidence.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}