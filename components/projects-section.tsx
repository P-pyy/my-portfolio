"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { type Project } from "@/components/project-card"
import { ProjectShowcaseRow } from "@/components/project-showcase"
import { ProjectModal } from "@/components/project-modal"
import { HudChrome } from "@/components/hud-chrome"

const PROJECTS: Project[] = [
  {
    id: "scheduly",
    title: "Scheduly",
    description:
      "A scheduling app for service businesses, with appointment booking, client discovery, and tools for managing daily work.",
    image: "/images/scheduly1.png",
    gallery: [
      "/images/scheduly1.png",
      "/images/scheduly2.png",
      "/images/scheduly3.png",
      "/images/scheduly4.png",
      "/images/scheduly5.png",
      "/images/scheduly6.png",
      "/images/scheduly7.png",
      "/images/scheduly8.png",
      "/images/scheduly9.png",
      "/images/scheduly10.png",
    ],
    categories: ["Web Apps"],
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Supabase"],
    live: "https://schedulyy.vercel.app/",
    github: "https://github.com/P-pyy/scheduly",
    index: "01",
  },
  {
    id: "reigi-kiosk",
    title: "Reigi Kiosk",
    description:
      "A kiosk application that manages student queues for URS registrar services and transactions.",
    image: "/images/reigi_kiosk1.png",
    gallery: [
      "/images/reigi_kiosk1.png",
      "/images/reigi_kiosk2.png",
      "/images/reigi_kiosk3.png",
      "/images/reigi_kiosk4.png",
      "/images/reigi_kiosk5.png",
    ],
    categories: ["Web Apps"],
    tags: ["JS", "Node", "EXP", "SB"],
    live: "https://reigi.vercel.app/kiosk/",
    github: "https://github.com/P-pyy/REIGI",
    index: "02",
  },
  {
    id: "reigi",
    title: "Reigi",
    description:
      "A website that provides assistant to URS students regarding registrar-related student problems.",
    image: "/images/reigi_website1.png",
    gallery: ["/images/reigi_website1.png", "/images/reigi_website2.png"],
    categories: ["Websites"],
    tags: ["HTML", "CSS", "JS", "Node"],
    live: "https://reigi.vercel.app/",
    github: "https://github.com/P-pyy/REIGI",
    index: "02",
  },
  {
    id: "dream-pc",
    title: "Dream PC Build & IT Solutions",
    description:
      "A company website for Dream PC Build & IT Solutions, covering custom PC builds and IT services.",
    image: "/images/dpc_website1.png",
    gallery: [
      "/images/dpc_website1.png",
      "/images/dpc_website2.png",
      "/images/dpc_website3.png",
      "/images/dpc_website4.png",
      "/images/dpc_website5.png",
    ],
    categories: ["Websites"],
    tags: ["HTML", "CSS", "BS", "JS"],
    live: "https://dreampcbuild.com/",
    github: "https://github.com/auxclark/dreampcbuildanditsolutionsinc",
    index: "03",
  },
  {
    id: "dpc-system",
    title: "DPC Management System",
    description:
      "A management system for tracking and organizing the day-to-day work at Dream PC Build & IT Solutions.",
    image: "/images/dpc_system1.jpeg",
    gallery: [
      "/images/dpc_system1.jpeg",
      "/images/dpc_system2.jpeg",
      "/images/dpc_system3.png",
      "/images/dpc_system4.png",
      "/images/dpc_system5.png",
    ],
    categories: ["Web Apps", "Other"],
    tags: ["VB", "C#", "HS"],
    live: "#",
    github: "https://github.com/loudevra/dpcbits",
    index: "04",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "This portfolio site, with a selection of my projects, tools, and contact details.",
    image: "/images/portfolio1.png",
    gallery: [
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png",
      "/images/portfolio4.png",
    ],
    categories: ["Websites"],
    tags: ["TS", "react js", "NEXT", "tailwind css"],
    live: "https://hiangan-portfolio.vercel.app/",
    github: "https://github.com/P-pyy/my-portfolio",
    index: "05",
  },
  
]

const FILTERS = ["All", "Websites", "Web Apps", "Other"]
const PROJECTS_CAPTION = "Some of the websites and apps I've worked on."

const titleClip =
  "polygon(38px 0, calc(100% - 38px) 0, 100% 50%, calc(100% - 38px) 100%, 38px 100%, 0 50%)"

export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [active, setActive] = useState<Project | null>(null)
  const [typedCaption, setTypedCaption] = useState("")
  const captionRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    const element = captionRef.current
    if (!element) return

    let timer: number | undefined
    const clearTyping = () => {
      if (timer !== undefined) window.clearInterval(timer)
      timer = undefined
    }
    const startTyping = () => {
      clearTyping()
      let index = 0
      setTypedCaption("")
      timer = window.setInterval(() => {
        index += 1
        setTypedCaption(PROJECTS_CAPTION.slice(0, index))
        if (index === PROJECTS_CAPTION.length) clearTyping()
      }, 38)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping()
        } else {
          clearTyping()
          setTypedCaption("")
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      clearTyping()
    }
  }, [])

  const visible = useMemo(() => {
    if (filter === "All") return PROJECTS
    return PROJECTS.filter((p) => p.categories.includes(filter))
  }, [filter])

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden pb-20 pt-24"
    >
      {/* ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blood/8 blur-3xl"
        style={{ transform: 'translateZ(0)' }}
      />
      {/* giant faint watermark word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-24 z-0 select-none font-mono text-[18vw] font-black leading-none tracking-tighter text-white/[0.02]"
      >
        WORK
      </span>

      {/* peripheral HUD chrome */}
      <HudChrome />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-24">
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-blood" />
            <span className="h-0.5 w-8 bg-blood/60" />
            <span className="h-0.5 w-4 bg-blood/40" />
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-blood sm:text-xs sm:tracking-[0.35em]">
            02 / SELECTED WORK
          </span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-4 bg-blood/40" />
            <span className="h-0.5 w-8 bg-blood/60" />
            <span className="h-1.5 w-1.5 bg-blood" />
          </span>
        </div>

        {/* framed title */}
        <div className="relative mx-auto mt-5 w-full max-w-2xl">
          {/* side connectors */}
          <span
            aria-hidden
            className="absolute left-[-52px] top-1/2 hidden h-px w-12 -translate-y-1/2 bg-blood/60 sm:block"
          />
          <span
            aria-hidden
            className="absolute left-[-58px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border border-blood/70 bg-ink sm:block"
          />
          <span
            aria-hidden
            className="absolute right-[-52px] top-1/2 hidden h-px w-12 -translate-y-1/2 bg-blood/60 sm:block"
          />
          <span
            aria-hidden
            className="absolute right-[-58px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border border-blood/70 bg-ink sm:block"
          />

          {/* frame border */}
          <div
            aria-hidden
            className="absolute inset-0 bg-blood shadow-[0_0_50px_-10px_var(--blood)]"
            style={{ clipPath: titleClip }}
          />
          <div
            aria-hidden
            className="absolute inset-[2px] bg-ink"
            style={{ clipPath: titleClip }}
          />
          <div
            aria-hidden
            className="absolute inset-[7px] border border-blood/25"
            style={{ clipPath: titleClip }}
          />

          <div className="relative px-14 py-7 text-center sm:px-20 sm:py-9">
            <h2 className="font-mono text-4xl font-black tracking-tight text-paper sm:text-6xl">
              My <span className="text-blood">Projects</span>
            </h2>
            <p
              ref={captionRef}
              aria-label={PROJECTS_CAPTION}
              className="mt-3 min-h-10 text-pretty font-mono text-xs text-paper-dim sm:min-h-5 sm:text-sm"
            >
              {typedCaption}
            </p>
          </div>
        </div>

        {/* filter pills with connector line */}
        <div className="relative mt-10">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden h-px w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-blood/20 md:block"
          />
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map((f) => {
              const isActive = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`border px-6 py-2.5 font-mono text-sm font-semibold tracking-widest transition-all duration-300 ${
                    isActive
                      ? "border-blood bg-blood text-paper shadow-[0_0_24px_-6px_var(--blood)]"
                      : "border-blood/25 bg-ink/70 text-paper-dim hover:border-blood/60 hover:text-paper"
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>

        {/* project showcase — alternating editorial rows */}
        <div className="relative mt-16">
          {/* vertical spine connecting the showcase rows */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blood/20 to-transparent lg:block"
          />
          <div className="relative flex flex-col gap-20 lg:gap-28">
            {visible.map((project, i) => (
              <ProjectShowcaseRow
                key={project.id}
                project={project}
                index={i}
                onView={setActive}
              />
            ))}
          </div>
        </div>


        {/* more coming soon */}
        <div className="mt-16 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-sm font-semibold tracking-wide text-blood">
            <span aria-hidden className="mr-2">
              &#47;&#47;
            </span>
            More projects coming soon!
          </p>
          <p className="font-mono text-sm text-paper-dim">
            I&apos;m always building and learning.
          </p>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
