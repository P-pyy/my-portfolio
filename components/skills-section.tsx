"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Code2, Database, Zap } from "lucide-react"
import { SkillsHud } from "@/components/skills-hud"

type Skill = { name: string; icon: string; label: string }

type Category = {
  id: string
  code: string
  level: string
  title: string
  description: string
  icon: React.ReactNode
  skills: Skill[]
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    code: ">_.01",
    level: "SYS.LVL A",
    title: "Frontend",
    description: "Building the visual and interactive experiences users love.",
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      { name: "HTML5", icon: "/images/html.svg", label: "MARKUP" },
      { name: "CSS3", icon: "/images/css.svg", label: "STYLING" },
      { name: "JavaScript", icon: "/images/javascript.svg", label: "SCRIPTING" },
      { name: "TypeScript", icon: "/images/typescript.svg", label: "TYPING" },
      { name: "React", icon: "/images/react.svg", label: "LIBRARY" },
      { name: "Next.js", icon: "/images/nextjs.svg", label: "FRAMEWORK" },
      { name: "Tailwind CSS", icon: "/images/tailwind.svg", label: "UTILITY CSS" },
      { name: "Bootstrap", icon: "/images/bootstrap.svg", label: "FRAMEWORK" },
    ],
  },
  {
    id: "backend",
    code: ">_.02",
    level: "SYS.LVL B",
    title: "Backend",
    description: "Powering the logic, database, and server-side functionalities.",
    icon: <Database className="h-6 w-6" />,
    skills: [
      { name: "Node.js", icon: "/images/nodejs.svg", label: "RUNTIME" },
      { name: "Express.js", icon: "/images/expressjs.svg", label: "FRAMEWORK" },
      { name: "MongoDB", icon: "/images/mongo.svg", label: "DATABASE" },
      { name: "MySQL", icon: "/images/mysql.svg", label: "DATABASE" },
      { name: "Firebase", icon: "/images/firebase.svg", label: "PLATFORM" },
      { name: "Supabase", icon: "/images/supabase.svg", label: "BACKEND" },
      { name: "VB.NET", icon: "/images/vbnet.svg", label: "LANGUAGE" },
    ],
  },
  {
    id: "tools",
    code: ">_.03",
    level: "SYS.LVL C",
    title: "Tools & Technologies",
    description: "Tools and platforms that enhance productivity and development.",
    icon: <Zap className="h-6 w-6" />,
    skills: [
      { name: "Git", icon: "/images/git.svg", label: "VERSION CONTROL" },
      { name: "GitHub", icon: "/images/github.svg", label: "REPOSITORY" },
      { name: "Figma", icon: "/images/figma.svg", label: "UI/UX DESIGN" },
      { name: "VS Code", icon: "/images/vscode.svg", label: "CODE EDITOR" },
      { name: "Vercel", icon: "/images/vercel.svg", label: "DEPLOYMENT" },
      { name: "npm", icon: "/images/npm.svg", label: "PACKAGE MANAGER" },
    ],
  },
]

const titleClip =
  "polygon(38px 0, calc(100% - 38px) 0, 100% 50%, calc(100% - 38px) 100%, 38px 100%, 0 50%)"

/* angular frame: cut top-left + bottom-right corners */
const panelClip =
  "polygon(0 22px, 22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)"

const tileClip =
  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setHasEntered(true)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView, hasEntered }
}

function SkillTile({
  skill,
  delay,
  rotationDelay,
  inView,
}: {
  skill: Skill
  delay: number
  rotationDelay: number
  inView: boolean
}) {
  return (
    <div
      className="group/tile relative transition-transform duration-300 hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {/* glowing frame */}
      <div
        aria-hidden
        className="absolute inset-0 bg-blood/60 opacity-70 transition-opacity duration-300 group-hover/tile:opacity-100 group-hover/tile:shadow-[0_0_20px_-4px_var(--blood)]"
        style={{ clipPath: tileClip }}
      />
      <div
        className="relative m-[1.5px] flex flex-col items-center justify-center gap-2 overflow-hidden bg-ink px-3 py-4"
        style={{ clipPath: tileClip }}
      >
        {/* scanline sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full translate-y-[-100%] bg-gradient-to-b from-transparent via-blood/12 to-transparent transition-transform duration-700 group-hover/tile:translate-y-[100%]"
        />
        <div className="tech-stack-logo-stage relative h-8 w-8 transition-transform duration-300 group-hover/tile:scale-110">
          <Image
            src={skill.icon || "/placeholder.svg"}
            alt={skill.name}
            fill
            className="tech-stack-logo object-contain"
            style={{ animationDelay: `-${rotationDelay}s` }}
          />
        </div>
        <span className="font-mono text-[12px] font-bold text-paper">{skill.name}</span>
        <span className="text-center font-mono text-[9px] font-semibold tracking-[0.15em] text-blood">{skill.label}</span>
      </div>
    </div>
  )
}

function CategoryPanel({ category, categoryIndex }: { category: Category; categoryIndex: number }) {
  const { ref, inView, hasEntered } = useInView<HTMLDivElement>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) {
      setProgress(0)
      return
    }

    const duration = 2800
    const startTime = performance.now()
    let frameId = 0

    const animateProgress = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frameId = requestAnimationFrame(animateProgress)
      }
    }

    setProgress(0)
    frameId = requestAnimationFrame(animateProgress)

    return () => cancelAnimationFrame(frameId)
  }, [inView])

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* glowing frame */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-blood via-blood/50 to-blood/80 opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_-12px_var(--blood)]"
        style={{ clipPath: panelClip }}
      />
      <div
        className="relative m-[2px] bg-ink p-6 sm:p-8"
        style={{ clipPath: panelClip }}
      >
        {/* level tag */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-5 font-mono text-[10px] tracking-[0.3em] text-blood/70"
        >
          {category.level}
        </span>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
          {/* left: icon + label + progress */}
          <div className="flex shrink-0 flex-col gap-4 lg:w-64">
            <span className="font-mono text-[11px] tracking-[0.3em] text-blood/70">{category.code}</span>
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center border border-blood/60 text-blood transition-all duration-300 group-hover:shadow-[0_0_18px_-4px_var(--blood)]">
                {category.icon}
                <span aria-hidden className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-blood" />
                <span aria-hidden className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-blood" />
              </div>
              <h3 className="text-balance font-mono text-2xl font-black leading-tight tracking-tight text-paper">
                {category.title}
              </h3>
            </div>
            <p className="font-mono text-sm leading-relaxed text-paper-dim">{category.description}</p>

            {/* proficiency bar */}
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="relative h-1.5 flex-1 overflow-hidden bg-blood/15">
                <span
                  className={`absolute inset-y-0 left-0 bg-blood shadow-[0_0_10px_-2px_var(--blood)] ${
                    progress < 100 ? "animate-[skills-progress-glow_1.8s_ease-in-out_infinite]" : ""
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-sm font-bold text-blood">{progress}%</span>
            </div>
          </div>

          {/* right: skill grid */}
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {category.skills.map((skill, i) => (
              <SkillTile
                key={skill.name}
                skill={skill}
                delay={i * 60}
                rotationDelay={(categoryIndex * 8 + i) * 0.75}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full overflow-hidden pb-20 pt-24">
      {/* ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blood/10 blur-[120px]"
      />
      {/* giant faint watermark word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-24 z-0 select-none font-mono text-[18vw] font-black leading-none tracking-tighter text-white/[0.02]"
      >
        STACK
      </span>

      {/* peripheral HUD chrome — diagnostics / spectrum analyzer theme */}
      <SkillsHud />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-24">
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-blood" />
            <span className="h-0.5 w-8 bg-blood/60" />
            <span className="h-0.5 w-4 bg-blood/40" />
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-blood sm:text-xs sm:tracking-[0.35em]">03 / TECH STACK</span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-4 bg-blood/40" />
            <span className="h-0.5 w-8 bg-blood/60" />
            <span className="h-1.5 w-1.5 bg-blood" />
          </span>
        </div>

        {/* framed title */}
        <div className="relative mx-auto mt-5 w-full max-w-2xl">
          <span aria-hidden className="absolute left-[-52px] top-1/2 hidden h-px w-12 -translate-y-1/2 bg-blood/60 sm:block" />
          <span aria-hidden className="absolute left-[-58px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border border-blood/70 bg-ink sm:block" />
          <span aria-hidden className="absolute right-[-52px] top-1/2 hidden h-px w-12 -translate-y-1/2 bg-blood/60 sm:block" />
          <span aria-hidden className="absolute right-[-58px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border border-blood/70 bg-ink sm:block" />

          <div aria-hidden className="absolute inset-0 bg-blood shadow-[0_0_50px_-10px_var(--blood)]" style={{ clipPath: titleClip }} />
          <div aria-hidden className="absolute inset-[2px] bg-ink" style={{ clipPath: titleClip }} />
          <div aria-hidden className="absolute inset-[7px] border border-blood/25" style={{ clipPath: titleClip }} />

          <div className="relative px-14 py-7 text-center sm:px-20 sm:py-9">
            <h2 className="font-mono text-4xl font-black tracking-tight text-paper sm:text-6xl">
              My <span className="text-blood">Skills</span>
            </h2>
            <p className="mt-3 text-pretty font-mono text-xs text-paper-dim sm:text-sm">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>
        </div>

        {/* category panels */}
        <div className="mt-12 flex flex-col gap-6">
          {CATEGORIES.map((category, categoryIndex) => (
            <CategoryPanel key={category.id} category={category} categoryIndex={categoryIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}
