"use client"

import { useMemo, useState } from "react"
import { ProjectCard, type Project } from "@/components/project-card"
import { ProjectModal } from "@/components/project-modal"
import { HudChrome } from "@/components/hud-chrome"

const PROJECTS: Project[] = [
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
    index: "01",
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
      "A technology solutions website that offers custom PC builds, IT services, and technical support.",
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
      "A management system for tracking and organizing business operations.",
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
      "My personal portfolio showcasing my projects and skills.",
    image: "/images/dpc_system1.jpeg",
    gallery: [
      "/images/dpc_system1.jpeg",
      "/images/dpc_system2.jpeg",
      "/images/dpc_system3.png",
    ],
    categories: ["Websites"],
    tags: ["TS", "react js", "NEXT", "tailwind css"],
    live: "https://hiangan-portfolio.vercel.app/",
    github: "https://github.com/P-pyy/my-portfolio",
    index: "05",
  },
  
]

const FILTERS = ["All", "Websites", "Web Apps", "Other"]

const titleClip =
  "polygon(38px 0, calc(100% - 38px) 0, 100% 50%, calc(100% - 38px) 100%, 38px 100%, 0 50%)"

export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [active, setActive] = useState<Project | null>(null)

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
          <span className="font-mono text-xs tracking-[0.35em] text-blood">
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
            <p className="mt-3 text-pretty font-mono text-xs text-paper-dim sm:text-sm">
              A collection of websites and apps I&apos;ve built with passion.
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

        {/* project grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {visible.map((project, i) => {
            const isLastSingle = visible.length % 2 === 1 && i === visible.length - 1
            if (isLastSingle) {
              return (
                <div key={project.id} className="lg:col-span-2 flex justify-center">
                  <div className="w-full max-w-[676px]">
                    <ProjectCard project={project} onView={setActive} />
                  </div>
                </div>
              )
            }

            return <ProjectCard key={project.id} project={project} onView={setActive} />
          })}
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
