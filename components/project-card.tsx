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
  }

  return (
    <article className="group relative">
      {/* ambient outer glow (not clipped) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-xl bg-blood/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
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
            <h3 className="font-mono text-2xl font-bold leading-tight text-paper">
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
          className="group/btn mt-5 flex w-full items-center justify-center gap-2 border border-blood/70 bg-blood/5 py-3 font-mono text-sm font-semibold tracking-[0.3em] text-blood transition-all duration-300 hover:bg-blood hover:text-paper hover:shadow-[0_0_24px_-6px_var(--blood)]"
        >
          VIEW PROJECT
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}
