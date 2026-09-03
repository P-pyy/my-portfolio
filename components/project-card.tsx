"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

export type Project = {
  id: string
  title: string
  description: string
  image: string
  gallery: string[]
  categories: string[]
  tags: string[]
  live: string
  github: string
  index: string
}

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
const cardClip =
  "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)"
const btnClip =
  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"

export function ProjectCard({
  project,
  onView,
}: {
  project: Project
  onView: (project: Project) => void
}) {
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
    TS: "/images/typescript.svg",
    // lowercase / spaced variants used in project tags
    typescript: "/images/typescript.svg",
    "react js": "/images/react.svg",
    react: "/images/react.svg",
    REACT: "/images/react.svg",
    "next js": "/images/nextjs.svg",
    next: "/images/nextjs.svg",
    NEXT: "/images/nextjs.svg",
    "tailwind css": "/images/tailwind.svg",
    tailwind: "/images/tailwind.svg",
  }

  return (
    <article className="group relative">
      {/* solid clipped border overlay so every card shows a consistent red outline */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-40"
        style={{ clipPath: cardClip, border: "2px solid var(--blood)" }}
      />
      {/* ambient outer glow (not clipped) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-xl bg-blood/16 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* glowing red frame border */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-blood via-blood/50 to-blood/80 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{ clipPath: cardClip }}
      />
      {/* inner surface */}
      <div
        className="relative m-[2px] bg-ink p-5"
        style={{ clipPath: cardClip }}
      >
        {project.id === "personal-portfolio" && (
          <>
            <span
              aria-hidden
              className="absolute z-20 block"
              style={{ left: "22px", right: "22px", top: 0, height: "2px", background: "var(--blood)" }}
            />
            <span
              aria-hidden
              className="absolute z-20 block"
              style={{ left: "22px", right: "22px", bottom: 0, height: "2px", background: "var(--blood)" }}
            />
          </>
        )}
        {/* header row: // PROJECT label + index */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-[0.3em]">
            <span className="text-blood">&#47;&#47;</span>{" "}
            <span className="text-paper-dim">PROJECT</span>
          </span>
          <span className="font-mono text-sm font-bold text-blood">
            {project.index}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_1.05fr]">
          {/* LEFT: title + description + tech */}
          <div className="flex flex-col">
            <h3
              className={`font-mono text-xl font-bold leading-tight text-paper sm:text-2xl ${
                project.id === "personal-portfolio" ? "whitespace-nowrap overflow-hidden" : ""
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-dim">
              {project.description}
            </p>

            {/* segmented HUD divider */}
            <div
              aria-hidden
              className="mt-4 flex items-center gap-1.5"
            >
              <span className="h-0.5 w-6 bg-blood" />
              <span className="h-0.5 w-2 bg-blood/60" />
              <span className="h-0.5 w-1 bg-blood/40" />
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* tech hex badges */}
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {project.tags.map((tag) => {
                const lookup = TAG_ICONS[tag] || TAG_ICONS[tag.toUpperCase()]
                return (
                  <li
                    key={tag}
                    className="group/badge relative flex h-11 w-11 items-center justify-center"
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
                        alt={tag}
                        width={24}
                        height={24}
                        className="relative h-5 w-5 object-contain"
                      />
                    ) : (
                      <span className="relative font-mono text-[10px] font-bold text-paper">
                        {tag}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* RIGHT: screenshot */}
          <div className="relative overflow-hidden rounded-md border border-blood/30 aspect-[16/9] bg-ink">
            {/* scanline overlay */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-blood/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ animation: "hero-scan 2.6s linear infinite" }}
            />
            <span className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`Screenshot of ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* full-width VIEW PROJECT bar */}
        <button
          type="button"
          onClick={() => onView(project)}
          className="group/btn relative isolate mt-5 flex w-full items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-blood via-blood-bright to-blood p-[2px] font-mono text-sm font-semibold tracking-[0.3em] text-blood shadow-[0_0_18px_-8px_var(--blood)] transition-all duration-300 hover:-translate-y-0.5 hover:text-paper hover:shadow-[0_0_30px_-4px_var(--blood-bright)]"
          style={{ clipPath: btnClip }}
        >
          <span
            aria-hidden
            className="absolute inset-[2px] bg-gradient-to-br from-white/[0.1] via-ink/95 to-ink/85 transition-colors duration-300 group-hover/btn:from-white/[0.16] group-hover/btn:via-ink/75 group-hover/btn:to-blood/25"
            style={{ clipPath: btnClip }}
          />
          <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover/btn:translate-x-[430%]" />
          <span className="relative flex items-center justify-center gap-2 py-3">
            VIEW PROJECT
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </span>
        </button>
      </div>
    </article>
  )
}
