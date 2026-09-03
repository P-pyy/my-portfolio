"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react"
import type { Project } from "@/components/project-card"

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

// large angular HUD frame with clipped corners
const frameClip =
  "polygon(0 34px, 34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px))"

// angular button clip (bottom-left + top-right notch)
const btnClip =
  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const TAG_ICONS: Record<string, string> = {
    HTML: "/images/html.svg",
    CSS: "/images/css.svg",
    JS: "/images/javascript.svg",
    "C#": "/images/csharp.svg",
    VB: "/images/vbnet.svg",
    BS: "/images/bootstrap.svg",
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
    HS: "/images/heidisql.png",
  }
  const [slide, setSlide] = useState(0)

  const gallery = project?.gallery ?? []
  const count = gallery.length

  const go = useCallback(
    (dir: number) => {
      if (count === 0) return
      setSlide((s) => (s + dir + count) % count)
    },
    [count],
  )

  // reset to first slide whenever a new project opens
  useEffect(() => {
    setSlide(0)
  }, [project?.id])

  // keyboard: esc to close, arrows to navigate; lock body scroll
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [project, go, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/85"
      />

      {/* frame wrapper (carries the margin decorations) */}
      <div className="hero-rise relative z-10 w-full max-w-5xl">
        {/* margin HUD decorations */}
        <span className="pointer-events-none absolute -left-2 top-10 hidden font-mono text-[10px] leading-relaxed tracking-widest text-blood/70 lg:block">
          DATA NODE
          <br />
          <span className="text-2xl font-bold text-blood/90">04</span>
        </span>
        <span className="pointer-events-none absolute -right-3 bottom-16 hidden flex-col items-end font-mono text-[10px] leading-relaxed tracking-widest text-blood/70 lg:flex">
          SECURE LINK
          <br />
          ENCRYPTED
          <Lock className="mt-1 h-3.5 w-3.5 self-end" />
        </span>
        <span className="pointer-events-none absolute -left-2 bottom-2 hidden font-mono text-[10px] leading-relaxed tracking-widest text-blood/60 lg:block">
          USER: PIPS
          <br />
          ID: 2026-08-11
        </span>
        <span className="pointer-events-none absolute left-1/3 -top-3 hidden text-blood/50 lg:block" aria-hidden>
          +
        </span>

        {/* glowing red frame border */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-blood via-blood/60 to-blood/90 shadow-[0_0_80px_-10px_var(--blood)]"
          style={{ clipPath: frameClip }}
        />

        {/* inner surface */}
        <div
          className="relative m-[2px] flex max-h-[90vh] flex-col overflow-hidden bg-ink"
          style={{ clipPath: frameClip }}
        >
          {/* scrollable content */}
          <div className="hero-hex relative overflow-y-auto px-6 py-6 sm:p-10">
            {/* red glow header wash */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blood/20 to-transparent"
            />

            

            {/* header row */}
            <div className="relative flex items-start justify-between gap-0 sm:gap-4">
              <div className="min-w-0 flex-1 sm:flex-none">
                {/* eyebrow */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-7 rounded-full bg-blood" />
                  <span className="font-mono text-xs font-semibold tracking-[0.35em] text-paper-dim">
                    PROJECT {project.index}
                  </span>
                </div>
                <h3
                  className={`font-mono text-xl font-black leading-tight text-paper sm:text-4xl ${
                    project.id === "personal-portfolio" ? "whitespace-nowrap overflow-hidden" : ""
                  }`}
                >
                  {project.title}
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-paper-dim text-justify -mr-4 sm:mr-0">
                  {project.description}
                </p>
              </div>

              {/* right side: status readout + close */}
              <div className="ml-auto flex flex-col items-end gap-4 sm:shrink-0 sm:ml-0">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-11 w-11 items-center justify-center border border-blood/50 bg-ink/70 text-paper transition-all duration-300 hover:border-blood hover:bg-blood hover:text-paper"
                  style={{ clipPath: hexClip }}
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="hidden text-right font-mono text-[10px] leading-relaxed tracking-widest text-blood/90 sm:block">
                  <p className="flex items-center justify-end gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blood shadow-[0_0_8px_2px_var(--blood)]" />
                    SYS. ONLINE
                  </p>
                  <p className="text-paper-dim">STATUS: ACTIVE</p>
                </div>
              </div>
            </div>

            {/* body: arrows overlay the screenshot on mobile and use gutters on larger screens */}
            <div className="relative mt-8 sm:flex sm:items-center sm:gap-5">
              {/* prev arrow */}
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 z-30 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-blood/60 bg-ink/70 text-blood transition-all duration-300 hover:border-blood hover:bg-blood hover:text-paper hover:shadow-[0_0_20px_-4px_var(--blood)] sm:relative sm:left-auto sm:top-auto sm:z-auto sm:h-11 sm:w-11 sm:shrink-0 sm:translate-y-0"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </button>
              )}

              {/* framed screenshot */}
              <div
                className="relative w-full overflow-hidden border border-blood/40 bg-ink shadow-[0_0_40px_-16px_var(--blood)] sm:flex-1"
                style={{ clipPath: btnClip }}
              >
                {/* scanline sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-blood/15 to-transparent"
                  style={{ animation: "hero-scan 3s linear infinite" }}
                />
                <span className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />

                {/* HUD readout corner */}
                <span className="absolute right-3 top-3 z-20 border border-blood/50 bg-ink/70 px-2 py-0.5 font-mono text-[10px] tracking-widest text-blood">
                  {String(slide + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>

                {/* slides track */}
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                  {gallery.map((src, i) => (
                    <div key={src} className="w-full flex-shrink-0 aspect-[16/9] relative">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* next arrow */}
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 z-30 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-blood/60 bg-ink/70 text-blood transition-all duration-300 hover:border-blood hover:bg-blood hover:text-paper hover:shadow-[0_0_20px_-4px_var(--blood)] sm:relative sm:right-auto sm:top-auto sm:z-auto sm:h-11 sm:w-11 sm:shrink-0 sm:translate-y-0"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>

            {/* dots */}
            {count > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                    aria-current={i === slide}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === slide ? "w-6 bg-blood" : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* footer: actions + tech badges */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-blood/20 pt-6 sm:flex-row sm:justify-between">
              <div className="w-56 flex flex-row gap-3 sm:w-auto sm:max-w-none sm:items-center">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative isolate flex flex-1 items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-blood via-blood-bright to-blood p-[2px] font-mono text-sm font-semibold tracking-widest text-blood shadow-[0_0_18px_-8px_var(--blood)] transition-all duration-300 hover:-translate-y-0.5 hover:text-paper hover:shadow-[0_0_30px_-4px_var(--blood-bright)] sm:flex-none"
                  style={{ clipPath: btnClip }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-[2px] bg-gradient-to-br from-white/[0.1] via-ink/95 to-ink/85 transition-colors duration-300 group-hover/btn:from-white/[0.16] group-hover/btn:via-ink/75 group-hover/btn:to-blood/25"
                    style={{ clipPath: btnClip }}
                  />
                  <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover/btn:translate-x-[430%]" />
                  <span className="relative flex items-center justify-center gap-2 px-3 py-2 sm:px-6">
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    PREVIEW
                  </span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 border border-white/15 bg-ink/60 px-3 sm:px-6 py-2 font-mono text-sm font-semibold tracking-widest text-paper transition-all duration-300 hover:border-paper/40"
                  style={{ clipPath: btnClip }}
                >
                  <GithubIcon className="h-4 w-4 text-white" />
                  GITHUB
                </a>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => {
                  const lookup = TAG_ICONS[tag] || TAG_ICONS[tag.toUpperCase()]
                  return (
                    <li key={tag} className="relative flex h-11 w-11 items-center justify-center">
                      <span className="absolute inset-0 bg-blood/40" style={{ clipPath: hexClip }} />
                      <span className="absolute inset-[1.5px] bg-ink" style={{ clipPath: hexClip }} />
                      {lookup ? (
                        <Image
                          src={lookup}
                          alt={tag}
                          width={28}
                          height={28}
                          className="relative h-6 w-6 object-contain"
                        />
                      ) : (
                        <span className="relative font-mono text-[10px] font-bold text-paper">{tag}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
