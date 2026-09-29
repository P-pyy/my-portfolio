"use client"

import Image from "next/image"
import { ArrowUpRight, Code2, Maximize2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Project } from "@/components/project-card"

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
const mediaClip =
  "polygon(26px 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%, 0 26px)"
const btnClip =
  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"

const TAG_ICONS: Record<string, string> = {
  HTML: "/images/html.svg",
  CSS: "/images/css.svg",
  JS: "/images/javascript.svg",
  "C#": "/images/csharp.svg",
  VB: "/images/vbnet.svg",
  BS: "/images/bootstrap.svg",
  HS: "/images/heidisql.png",
  NODE: "/images/nodejs.svg",
  Node: "/images/nodejs.svg",
  NODEJS: "/images/nodejs.svg",
  EXP: "/images/expressjs.svg",
  EXPRESS: "/images/expressjs.svg",
  SB: "/images/supabase.svg",
  Supabase: "/images/supabase.svg",
  TS: "/images/typescript.svg",
  TypeScript: "/images/typescript.svg",
  Vite: "/images/vite.svg",
  typescript: "/images/typescript.svg",
  "react js": "/images/react.svg",
  react: "/images/react.svg",
  REACT: "/images/react.svg",
  "next js": "/images/nextjs.svg",
  next: "/images/nextjs.svg",
  NEXT: "/images/nextjs.svg",
  Tailwind: "/images/tailwind.svg",
  "tailwind css": "/images/tailwind.svg",
  tailwind: "/images/tailwind.svg",
}

const TAG_LABELS: Record<string, string> = {
  JS: "JavaScript",
  TS: "TypeScript",
  BS: "Bootstrap",
  HS: "HeidiSQL",
  VB: "VB.NET",
  SB: "Supabase",
  EXP: "Express.js",
  NODE: "Node.js",
  Node: "Node.js",
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Reveal on scroll — keeps the existing slide-in language of the section. */
function useReveal<T extends HTMLElement>(fromRight: boolean) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting)
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    shown,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown
        ? "translate3d(0,0,0)"
        : `translate3d(${fromRight ? "6%" : "-6%"}, 22px, 0) scale(0.985)`,
      transition:
        "opacity 0.6s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)",
      willChange: "opacity, transform",
    } as React.CSSProperties,
  }
}

/** Subtle cursor-follow tilt + spotlight on the screenshot panel. */
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
    el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`)
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`)
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }, [])

  return { ref, onMove, onLeave }
}

function TechHexes({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {tags.map((tag) => {
        const lookup = TAG_ICONS[tag] || TAG_ICONS[tag.toUpperCase()]
        const label = TAG_LABELS[tag] ?? tag
        return (
          <li
            key={tag}
            className="group/badge relative flex h-11 w-11 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span
              className="absolute inset-0 bg-blood/50 transition-colors duration-300 group-hover/badge:bg-blood"
              style={{ clipPath: hexClip }}
            />
            <span
              className="absolute inset-[1.5px] bg-ink transition-colors duration-300 group-hover/badge:bg-blood/15"
              style={{ clipPath: hexClip }}
            />
            {lookup ? (
              <Image
                src={lookup}
                alt={label}
                width={24}
                height={24}
                className="relative h-5 w-5 object-contain"
              />
            ) : (
              <span className="relative font-mono text-[10px] font-bold text-paper">
                {tag}
              </span>
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap border border-blood/40 bg-ink px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] text-paper opacity-0 transition-opacity duration-200 group-hover/badge:opacity-100"
            >
              {label.toUpperCase()}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function ProjectShowcaseRow({
  project,
  index,
  featured,
  onView,
}: {
  project: Project
  index: number
  featured?: boolean
  onView: (project: Project) => void
}) {
  const flipped = index % 2 === 1
  const reveal = useReveal<HTMLElement>(flipped)
  const tilt = useTilt<HTMLDivElement>()

  return (
    <article
      ref={reveal.ref as React.RefObject<HTMLElement>}
      style={reveal.style}
      className="group/row relative"
    >
      <div
        className={`grid items-center gap-6 lg:gap-10 ${
          featured
            ? "lg:grid-cols-1"
            : flipped
              ? "lg:grid-cols-[0.85fr_1.15fr]"
              : "lg:grid-cols-[1.15fr_0.85fr]"
        }`}
      >
        {/* MEDIA */}
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
          className={`project-media group/media relative ${
            flipped && !featured ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 bg-blood/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover/row:opacity-100"
          />
          <div
            className="relative bg-gradient-to-br from-blood via-blood/40 to-blood/80 p-[2px]"
            style={{ clipPath: mediaClip }}
          >
            <div
              className={`relative overflow-hidden bg-ink ${
                featured ? "aspect-[21/9]" : "aspect-[16/10]"
              }`}
              style={{ clipPath: mediaClip }}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/media:scale-[1.05]"
              />
              {/* spotlight following the cursor */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
                style={{
                  background:
                    "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), oklch(0.66 0.23 28 / 0.22), transparent 70%)",
                }}
              />
              {/* scanline sweep — same language as the original cards */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-blood/25 to-transparent opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
                style={{ animation: "hero-scan 2.6s linear infinite" }}
              />
              <span className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />

              {/* hover preview affordance */}
              <button
                type="button"
                onClick={() => onView(project)}
                aria-label={`Preview ${project.title}`}
                className="absolute inset-0 z-20 flex items-end justify-end p-4 focus-visible:outline-none"
              >
                <span className="flex translate-y-2 items-center gap-2 border border-blood/60 bg-ink/85 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.25em] text-blood opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                  PREVIEW
                </span>
              </button>
            </div>
          </div>

          {/* corner index plate */}
          <span
            aria-hidden
            className="absolute -top-3 left-4 z-20 border border-blood/60 bg-ink px-2 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-blood"
          >
            {project.index}
          </span>
        </div>

        {/* COPY */}
        <div
          className={`relative flex flex-col ${
            flipped && !featured ? "lg:order-1 lg:pr-2" : "lg:order-2 lg:pl-2"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-blood" />
            <span className="h-px w-8 bg-blood/50" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-paper-dim">
              {project.categories.join(" / ").toUpperCase()}
            </span>
          </div>

          <h3
            className="mt-3 text-balance font-mono text-2xl font-black leading-[1.05] tracking-tight text-paper transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-3xl lg:text-4xl"
            style={{
              opacity: reveal.shown ? 1 : 0,
              transform: reveal.shown ? "translateY(0)" : "translateY(18px)",
            }}
          >
            {project.title}
          </h3>

          <p
            className="mt-4 max-w-prose text-sm leading-relaxed text-paper-dim transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base"
            style={{
              opacity: reveal.shown ? 1 : 0,
              transform: reveal.shown ? "translateY(0)" : "translateY(18px)",
              transitionDelay: reveal.shown ? "140ms" : "0ms",
            }}
          >
            {project.description}
          </p>

          {/* segmented HUD divider */}
          <div aria-hidden className="mt-5 flex items-center gap-1.5">
            <span className="h-0.5 w-6 bg-blood" />
            <span className="h-0.5 w-2 bg-blood/60" />
            <span className="h-0.5 w-1 bg-blood/40" />
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-5">
            <TechHexes tags={project.tags} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onView(project)}
              className="group/btn relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-r from-blood via-blood-bright to-blood p-[2px] font-mono text-xs font-semibold tracking-[0.28em] text-blood transition-transform duration-300 hover:-translate-y-0.5 hover:text-paper active:translate-y-0"
              style={{ clipPath: btnClip }}
            >
              <span
                aria-hidden
                className="absolute inset-[2px] bg-gradient-to-br from-white/[0.08] via-ink/95 to-ink/85 transition-colors duration-300 group-hover/btn:to-blood/25"
                style={{ clipPath: btnClip }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover/btn:translate-x-[430%]"
              />
              <span className="relative flex items-center gap-2 px-5 py-3">
                VIEW PROJECT
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </span>
            </button>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-blood/30 px-4 py-3 font-mono text-xs font-semibold tracking-[0.22em] text-paper-dim transition-colors duration-300 hover:border-blood/70 hover:text-paper"
              >
                <Code2 className="h-4 w-4" />
                CODE
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
