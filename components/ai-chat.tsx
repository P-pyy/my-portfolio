"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  MessageSquare,
  X,
  SendHorizontal,
  Radio,
  Minus,
  ArrowUpRight,
  Terminal,
  Zap,
  Hexagon,
  Diamond,
  Mail,
  User,
} from "lucide-react"

const panelClip =
  "polygon(0 22px, 22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px))"
const barClip =
  "polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))"
const bubbleClip =
  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
const inputClip =
  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"

type ProjectEntry = {
  id: string
  index: string
  title: string
  description: string
  image: string
  tags: string[]
  live?: string
  github?: string
}

const PROJECT_INDEX: ProjectEntry[] = [
  {
    id: "reigi-kiosk",
    index: "01",
    title: "Reigi Kiosk",
    description: "Kiosk app managing student queues for URS registrar services.",
    image: "/images/reigi_kiosk1.png",
    tags: ["JS", "Node", "Express", "Supabase"],
    live: "https://reigi.vercel.app/kiosk/",
    github: "https://github.com/P-pyy/REIGI",
  },
  {
    id: "reigi",
    index: "02",
    title: "Reigi",
    description: "Website assisting URS students with registrar-related problems.",
    image: "/images/reigi_website1.png",
    tags: ["HTML", "CSS", "JS", "Node"],
    live: "https://reigi.vercel.app/",
    github: "https://github.com/P-pyy/REIGI",
  },
  {
    id: "dream-pc",
    index: "03",
    title: "Dream PC Build & IT Solutions",
    description: "Tech solutions site for custom PC builds and IT services.",
    image: "/images/dpc_website1.png",
    tags: ["HTML", "CSS", "Bootstrap", "JS"],
    live: "https://dreampcbuild.com/",
    github: "https://github.com/auxclark/dreampcbuildanditsolutionsinc",
  },
  {
    id: "dpc-system",
    index: "04",
    title: "DPC Management System",
    description: "Management system for daily business operations.",
    image: "/images/dpc_system1.jpeg",
    tags: ["VB.NET", "C#", "HeidiSQL"],
    github: "https://github.com/loudevra/dpcbits",
  },
  {
    id: "personal-portfolio",
    index: "05",
    title: "Personal Portfolio",
    description: "This site — a black & red HUD portfolio experience.",
    image: "/images/portfolio1.png",
    tags: ["TypeScript", "React", "Next.js", "Tailwind"],
    live: "https://hiangan-portfolio.vercel.app/",
    github: "https://github.com/P-pyy/my-portfolio",
  },
]

const STACK_GROUPS: { label: string; items: string[] }[] = [
  { label: "FRONTEND", items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Bootstrap"] },
  { label: "BACKEND", items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Firebase", "Supabase", "VB.NET"] },
  { label: "TOOLS", items: ["Git", "GitHub", "Figma", "VS Code", "Vercel", "npm"] },
]

const SECTIONS: Record<string, string> = {
  home: "home",
  projects: "projects",
  work: "projects",
  skills: "skills",
  contact: "contact",
}

const QUICK_ACTIONS = [
  { icon: User, label: "ABOUT CHRESTINE", prompt: "Who is Chrestine?" },
  { icon: Zap, label: "BEST PROJECT", prompt: "What is her best project?" },
  { icon: Hexagon, label: "TECH STACK", prompt: "What's her tech stack?" },
  { icon: Diamond, label: "EXPERIENCE", prompt: "What experience does she have?" },
  { icon: Mail, label: "CONTACT", prompt: "How do I get in touch?" },
  { icon: Terminal, label: "/HELP", prompt: "/help" },
]

const COMMANDS: Record<string, string> = {
  "/about": "Who is Chrestine?",
  "/projects": "Show me her projects.",
  "/skills": "What's her tech stack?",
  "/experience": "What experience does she have?",
  "/resume": "Where can I get her resume?",
  "/contact": "How do I get in touch?",
}

const HELP_TEXT = `> SPIRIT.AI COMMAND INDEX
/about — background & profile
/projects — project archive
/skills — technical stack
/experience — experience summary
/resume — download resume
/contact — reach Chrestine
/clear — wipe this session`

const PLACEHOLDERS = [
  "Transmit a question...",
  "Ask about her projects...",
  "Ask about Chrestine...",
  "Ask about the stack...",
  "Type / for commands...",
]

const THINKING_LINES = ["> ANALYZING QUERY...", "> SEARCHING PORTFOLIO INDEX...", "> COMPOSING RESPONSE..."]

const INTRO_LINES = [
  "UPLINK ESTABLISHED.",
  "I'm SPIRIT — Chrestine's portfolio intelligence system.",
  "Ask me about her work, stack, experience, or how to reach her.",
]

function messageText(parts: { type: string; text?: string }[]) {
  return parts.map((p) => (p.type === "text" ? p.text ?? "" : "")).join("")
}

type Parsed = {
  text: string
  projects: ProjectEntry[]
  stack: boolean
  navs: string[]
  asks: string[]
}

function parseDirectives(raw: string): Parsed {
  const projects: ProjectEntry[] = []
  const navs: string[] = []
  const asks: string[] = []
  let stack = false

  const text = raw
    .replace(/\[\[\s*project\s*:\s*([a-z0-9-]+)\s*\]\]/gi, (_m, id: string) => {
      const found = PROJECT_INDEX.find((p) => p.id === id.toLowerCase())
      if (found && !projects.includes(found)) projects.push(found)
      return ""
    })
    .replace(/\[\[\s*stack\s*\]\]/gi, () => {
      stack = true
      return ""
    })
    .replace(/\[\[\s*nav\s*:\s*([a-z]+)\s*\]\]/gi, (_m, key: string) => {
      const section = SECTIONS[key.toLowerCase()]
      if (section && !navs.includes(section)) navs.push(section)
      return ""
    })
    .replace(/\[\[\s*ask\s*:\s*([^\]]+)\]\]/gi, (_m, list: string) => {
      list
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3)
        .forEach((q) => {
          if (!asks.includes(q)) asks.push(q)
        })
      return ""
    })
    // hide partially-streamed tags
    .replace(/\[\[[^\]]*$/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return { text, projects, stack, navs, asks }
}

/* minimal inline formatting: **bold** and `code` — no markdown library needed */
function RichText({ value }: { value: string }) {
  const nodes = value.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**") && chunk.length > 4) {
      return (
        <strong key={i} className="font-bold text-paper">
          {chunk.slice(2, -2)}
        </strong>
      )
    }
    if (chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 2) {
      return (
        <code key={i} className="border border-blood/40 bg-blood/10 px-1 font-mono text-[0.85em] text-blood">
          {chunk.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{chunk}</span>
  })
  return <>{nodes}</>
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  el.classList.add("spirit-target-flash")
  window.setTimeout(() => el.classList.remove("spirit-target-flash"), 1600)
}

function ProjectCard({ project, onAsk }: { project: ProjectEntry; onAsk: (q: string) => void }) {
  return (
    <div className="ai-chat-card mt-3 border border-blood/40 bg-ink" style={{ clipPath: bubbleClip }}>
      <div className="relative h-28 w-full overflow-hidden border-b border-blood/25">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="360px"
          className="object-cover object-top opacity-80 transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute left-2 top-2 border border-blood/50 bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-blood">
          {project.index}
        </span>
      </div>
      <div className="space-y-2 p-3">
        <div className="font-mono text-[11px] font-bold tracking-[0.18em] text-paper">{project.title.toUpperCase()}</div>
        <p className="font-mono text-[10px] leading-relaxed text-paper-dim">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span key={t} className="border border-blood/30 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-paper-faint">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="border border-blood/50 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-blood transition-colors duration-300 hover:bg-blood/15"
          >
            VIEW IN PORTFOLIO
          </button>
          {project.live && project.live !== "#" ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 border border-blood/30 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-paper-dim transition-colors duration-300 hover:border-blood/70 hover:text-paper"
            >
              LIVE <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => onAsk(`Tell me more about ${project.title}.`)}
            className="border border-blood/30 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-paper-dim transition-colors duration-300 hover:border-blood/70 hover:text-paper"
          >
            MORE
          </button>
        </div>
      </div>
    </div>
  )
}

function StackBoard({ onAsk }: { onAsk: (q: string) => void }) {
  return (
    <div className="ai-chat-card mt-3 space-y-3 border border-blood/40 bg-ink p-3" style={{ clipPath: bubbleClip }}>
      {STACK_GROUPS.map((group) => (
        <div key={group.label}>
          <div className="mb-1.5 font-mono text-[9px] tracking-[0.28em] text-blood">{group.label}</div>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onAsk(`Where has she used ${item}?`)}
                className="border border-blood/30 px-2 py-1 font-mono text-[9px] tracking-[0.1em] text-paper-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-blood/80 hover:text-paper"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => scrollToSection("skills")}
        className="border border-blood/50 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-blood transition-colors duration-300 hover:bg-blood/15"
      >
        VIEW ALL SKILLS
      </button>
    </div>
  )
}

export function AiChat() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [localNotes, setLocalNotes] = useState<{ id: string; text: string }[]>([])
  const [introStep, setIntroStep] = useState(0)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [thinkingLine, setThinkingLine] = useState(0)
  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), [])
  const { messages, sendMessage, status, error, setMessages } = useChat({ transport })

  const busy = status === "submitted" || status === "streaming"
  const expanded = open && !minimized
  const empty = messages.length === 0 && localNotes.length === 0

  useEffect(() => {
    if (!expanded) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 220)
    return () => window.clearTimeout(id)
  }, [expanded])

  useEffect(() => {
    if (!busy) inputRef.current?.focus()
  }, [busy])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, localNotes, busy])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /* terminal-style intro reveal */
  useEffect(() => {
    if (!expanded || !empty) return
    setIntroStep(0)
    const id = window.setInterval(() => {
      setIntroStep((s) => {
        if (s >= INTRO_LINES.length) {
          window.clearInterval(id)
          return s
        }
        return s + 1
      })
    }, 260)
    return () => window.clearInterval(id)
  }, [expanded, empty])

  /* rotating placeholder */
  useEffect(() => {
    const id = window.setInterval(() => setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length), 3600)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (status !== "submitted") return
    setThinkingLine(0)
    const id = window.setInterval(() => setThinkingLine((i) => Math.min(i + 1, THINKING_LINES.length - 1)), 420)
    return () => window.clearInterval(id)
  }, [status])

  const send = useCallback(
    (text: string) => {
      const value = text.trim()
      if (!value || busy) return
      setInput("")

      if (value.toLowerCase() === "/clear") {
        setMessages([])
        setLocalNotes([])
        return
      }
      if (value.toLowerCase() === "/help") {
        setLocalNotes((n) => [...n, { id: `help-${Date.now()}`, text: HELP_TEXT }])
        return
      }
      const mapped = COMMANDS[value.toLowerCase()]
      void sendMessage({ text: mapped ?? value })
    },
    [busy, sendMessage, setMessages],
  )

  return (
    <>
      {/* launcher */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v)
          setMinimized(false)
        }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="ai-chat-launcher group fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center border border-blood/60 bg-ink text-blood shadow-[0_0_28px_-8px_var(--blood)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blood hover:shadow-[0_0_36px_-6px_var(--blood-bright)] sm:h-16 sm:w-16"
        style={{ clipPath: bubbleClip }}
      >
        <span aria-hidden className="ai-chat-ping pointer-events-none absolute inset-0 border border-blood/40" style={{ clipPath: bubbleClip }} />
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />}
        {!open ? (
          <span aria-hidden className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blood" style={{ animation: "hero-blink 1.4s steps(1) infinite" }} />
        ) : null}
      </button>

      {/* minimized bar */}
      {open && minimized ? (
        <div className="fixed bottom-24 right-3 z-[69] sm:bottom-28 sm:right-5">
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="flex items-center gap-3 border border-blood/50 bg-ink px-4 py-2.5 shadow-[0_0_36px_-14px_var(--blood)] transition-colors duration-300 hover:border-blood"
            style={{ clipPath: barClip }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blood" style={{ animation: "hero-blink 1.6s steps(1) infinite" }} />
            <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-paper">SPIRIT.AI</span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-paper-faint">RESUME</span>
          </button>
        </div>
      ) : null}

      {/* panel */}
      <div
        role="dialog"
        aria-label="AI assistant"
        aria-hidden={!expanded}
        className={`ai-chat-panel fixed bottom-24 right-3 z-[69] w-[calc(100vw-1.5rem)] max-w-sm sm:right-5 sm:bottom-28 ${
          expanded ? "ai-chat-panel-open" : "pointer-events-none"
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-blood via-blood/30 to-blood/70 opacity-90 shadow-[0_0_60px_-18px_var(--blood)]"
          style={{ clipPath: panelClip }}
        />
        <div className="relative m-[2px] flex h-[min(70vh,540px)] flex-col bg-ink" style={{ clipPath: panelClip }}>
          {/* header */}
          <div className="flex items-start justify-between border-b border-blood/25 px-5 pb-3 pt-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.25em] text-paper">
                <Radio className="h-3.5 w-3.5 text-blood ai-chat-pulse" />
                SPIRIT.AI
              </div>
              <div className="mt-1 flex items-center gap-2 font-mono text-[9px] tracking-[0.28em] text-paper-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-blood" style={{ animation: "hero-blink 1.6s steps(1) infinite" }} />
                {busy ? "PROCESSING" : "CHANNEL OPEN"}
              </div>
              <div className="mt-0.5 font-mono text-[9px] tracking-[0.24em] text-paper-faint">
                └─ ONLINE • {busy ? "WORKING" : "READY"}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMinimized(true)}
                aria-label="Minimize AI assistant"
                className="border border-blood/40 p-1.5 text-blood transition-colors duration-300 hover:border-blood hover:bg-blood/10"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI assistant"
                className="border border-blood/40 p-1.5 text-blood transition-colors duration-300 hover:border-blood hover:bg-blood/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* transcript */}
          <div ref={listRef} className="ai-chat-scroll flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {empty ? (
              <div className="space-y-4">
                <div className="space-y-1.5 font-mono text-xs leading-relaxed">
                  {INTRO_LINES.slice(0, introStep).map((line, i) => (
                    <p key={line} className={`ai-chat-msg ${i === 0 ? "tracking-[0.2em] text-blood" : "text-paper-dim"}`}>
                      {line}
                    </p>
                  ))}
                </div>
                {introStep >= INTRO_LINES.length ? (
                  <div className="ai-chat-msg grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {QUICK_ACTIONS.map(({ icon: Icon, label, prompt }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => send(prompt)}
                        className="flex items-center gap-2 border border-blood/35 px-2.5 py-2 font-mono text-[10px] tracking-[0.12em] text-paper-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-blood/80 hover:text-paper"
                      >
                        <Icon className="h-3.5 w-3.5 text-blood" />
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {messages.map((m) => {
              const raw = messageText(m.parts as { type: string; text?: string }[])
              const mine = m.role === "user"
              if (mine) {
                if (!raw) return null
                return (
                  <div key={m.id} className="ai-chat-msg flex justify-end">
                    <div className="max-w-[85%]">
                      <div className="mb-1 text-right font-mono text-[9px] tracking-[0.28em] text-paper-faint">YOU</div>
                      <div className="bg-blood px-3 py-2 font-mono text-xs leading-relaxed text-paper" style={{ clipPath: bubbleClip }}>
                        <p className="whitespace-pre-wrap">{raw}</p>
                      </div>
                    </div>
                  </div>
                )
              }

              const parsed = parseDirectives(raw)
              if (!parsed.text && parsed.projects.length === 0 && !parsed.stack) return null

              return (
                <div key={m.id} className="ai-chat-msg flex justify-start">
                  <div className="w-[92%]">
                    <div className="mb-1 font-mono text-[9px] tracking-[0.28em] text-blood">SPIRIT</div>
                    {parsed.text ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-paper">
                        <RichText value={parsed.text} />
                      </p>
                    ) : null}

                    {parsed.projects.map((p) => (
                      <ProjectCard key={p.id} project={p} onAsk={send} />
                    ))}

                    {parsed.stack ? <StackBoard onAsk={send} /> : null}

                    {parsed.navs.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {parsed.navs.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              setMinimized(true)
                              scrollToSection(n)
                            }}
                            className="flex items-center gap-1.5 border border-blood/60 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.2em] text-blood transition-all duration-300 hover:-translate-y-0.5 hover:bg-blood/15"
                          >
                            EXPLORE {n.toUpperCase()} <ArrowUpRight className="h-3 w-3" />
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {parsed.asks.length && !busy ? (
                      <div className="mt-3 space-y-1.5">
                        <div className="font-mono text-[9px] tracking-[0.26em] text-paper-faint">YOU MAY ALSO ASK</div>
                        <div className="flex flex-wrap gap-2">
                          {parsed.asks.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => send(q)}
                              className="border border-blood/35 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-paper-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-blood/80 hover:text-paper"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}

            {localNotes.map((note) => (
              <pre
                key={note.id}
                className="ai-chat-msg whitespace-pre-wrap border border-blood/30 bg-blood/5 p-3 font-mono text-[10px] leading-relaxed text-paper-dim"
              >
                {note.text}
              </pre>
            ))}

            {status === "submitted" ? (
              <div className="ai-chat-thinking space-y-1 font-mono text-[10px] tracking-[0.2em] text-blood">
                {THINKING_LINES.slice(0, thinkingLine + 1).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            {error ? (
              <p className="font-mono text-[11px] leading-relaxed text-blood">
                Signal lost — the assistant is unavailable right now. Please try again, or use the contact form.
              </p>
            ) : null}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="border-t border-blood/25 px-4 pb-4 pt-3"
          >
            <div className="relative flex items-end gap-2 border border-blood/40 bg-ink p-2 transition-colors duration-300 focus-within:border-blood" style={{ clipPath: inputClip }}>
              <label htmlFor="ai-chat-input" className="sr-only">
                Message the AI assistant
              </label>
              <span aria-hidden className="pl-1 pb-2 font-mono text-xs text-blood">
                &gt;
              </span>
              <textarea
                id="ai-chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                placeholder={PLACEHOLDERS[placeholderIndex]}
                className="max-h-24 flex-1 resize-none bg-transparent px-1 py-1.5 font-mono text-xs text-paper placeholder:text-paper-faint focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || input.trim() === ""}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-blood/60 text-blood transition-all duration-300 hover:border-blood hover:bg-blood/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-paper-faint">
              <span>/HELP FOR COMMANDS</span>
              <span>ENTER ↵ SEND • SHIFT+ENTER NEWLINE</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
