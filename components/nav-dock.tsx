"use client"

import { useEffect, useState } from "react"
import { Home, Briefcase, Wrench, IdCard } from "lucide-react"

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Work", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "contact", label: "Contact", icon: IdCard },
]

const frameClip =
  "polygon(0 26px, 22px 0, calc(100% - 22px) 0, 100% 26px, 100% calc(100% - 26px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 26px))"

const cellClip =
  "polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"

function goTo(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function NavDock() {
  const [active, setActive] = useState("home")
  const [isCompact, setIsCompact] = useState(false)
  const [isRailExpanded, setIsRailExpanded] = useState(true)

  // track the section currently in view
  useEffect(() => {
    const sections = items
      .filter((i) => i.id !== "home")
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const onScroll = () => {
      if (window.scrollY < 200) {
        setActive("home")
        return
      }
      const mid = window.innerHeight / 2
      let current = "home"
      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= mid) current = el.id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const updateCompactState = () => {
      setIsCompact(window.innerWidth < 1024 && active !== "home")
    }

    updateCompactState()
    window.addEventListener("scroll", updateCompactState, { passive: true })
    window.addEventListener("resize", updateCompactState)
    return () => {
      window.removeEventListener("scroll", updateCompactState)
      window.removeEventListener("resize", updateCompactState)
    }
  }, [active])

  useEffect(() => {
    setIsRailExpanded(!isCompact)
  }, [isCompact])

  function handleNavClick(id: string) {
    if (isCompact && !isRailExpanded) {
      setIsRailExpanded(true)
      return
    }
    goTo(id)
    if (isCompact) setIsRailExpanded(false)
  }

  return (
    <nav
      aria-label="Primary"
      className={`z-50 transition-[top,left,right,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:left-1/2 lg:right-auto lg:top-0 lg:-translate-x-1/2 lg:-translate-y-0 lg:px-3 ${
        isCompact
          ? "fixed left-auto top-1/2 -translate-x-0 -translate-y-1/2 px-0"
          : "absolute left-1/2 right-auto top-0 -translate-x-1/2 -translate-y-0 px-3"
      }`}
      style={isCompact ? { right: "env(safe-area-inset-right)" } : undefined}
    >
      <div className="relative">
        {/* side index labels */}
        <span className={`pointer-events-none absolute -left-7 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] tracking-widest text-paper-dim md:block ${isCompact ? "md:hidden" : ""}`}>
          01
        </span>
        <span className={`pointer-events-none absolute -right-7 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] tracking-widest text-paper-dim md:block ${isCompact ? "md:hidden" : ""}`}>
          04
        </span>

        {/* glowing frame border */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-b from-blood via-blood/70 to-blood/90 shadow-[0_0_30px_-6px_var(--blood)] ${
            isCompact ? "hidden lg:block" : ""
          }`}
          style={{ clipPath: frameClip }}
        />

        {/* inner surface */}
        <div
          className={`relative bg-ink lg:m-[2px] lg:px-4 lg:pb-3 lg:pt-6 ${
            isCompact ? "m-0 bg-transparent p-0" : "m-[2px] px-3 pb-2.5 pt-5"
          }`}
          style={{ clipPath: isCompact ? "none" : frameClip }}
        >
          {/* top readout row */}
          <div
            className={`pointer-events-none absolute inset-x-4 top-1.5 items-center justify-between ${
              isCompact ? "hidden lg:flex" : "flex"
            }`}
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-blood/80">
              NAV.SYSTEM
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1 w-2 bg-blood"
                  style={{ opacity: 0.25 + ((i * 5) % 8) / 10 }}
                />
              ))}
            </span>
          </div>

          {/* icon cells */}
          <ul
            className={`flex items-center lg:flex-row lg:gap-3 ${
              isCompact ? "flex-col gap-1" : "flex-row gap-2"
            }`}
          >
            {items.map(({ id, label, icon: Icon }) => {
              const isActive = active === id
              const isHome = id === "home"

              if (isHome) {
                return (
                  <li
                    key={id}
                    className={`transition-all duration-300 lg:max-h-none lg:opacity-100 lg:overflow-visible ${
                      isCompact && !isRailExpanded && !isActive
                        ? "pointer-events-none max-h-0 overflow-hidden opacity-0"
                        : "max-h-14 opacity-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(id)}
                      aria-label={label}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative flex items-center justify-center lg:h-16 lg:w-16 ${
                        isCompact ? "h-11 w-11" : "h-14 w-14"
                      } ${isCompact ? "bg-ink/45 backdrop-blur-md" : ""}`}
                    >
                      {/* radar rings */}
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-blood shadow-[0_0_22px_-2px_var(--blood)]"
                            : "border-blood/40 group-hover:border-blood/70"
                        }`}
                      />
                      <span
                        aria-hidden
                        className={`absolute inset-1.5 rounded-full border border-blood/40 transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-50"
                        }`}
                      />
                      {/* crosshair ticks */}
                      <span aria-hidden className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-blood" />
                      <span aria-hidden className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-blood" />
                      <span aria-hidden className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-blood" />
                      <span aria-hidden className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-blood" />
                      <Home
                        className={`h-5 w-5 lg:h-6 lg:w-6 transition-all duration-300 group-hover:scale-110 ${
                          isActive ? "text-blood drop-shadow-[0_0_6px_var(--blood)]" : "text-paper"
                        }`}
                      />
                    </button>
                  </li>
                )
              }

              return (
                  <li
                    key={id}
                    className={`transition-all duration-300 lg:max-h-none lg:opacity-100 lg:overflow-visible ${
                      isCompact && !isRailExpanded && !isActive
                        ? "pointer-events-none max-h-0 overflow-hidden opacity-0"
                        : "max-h-12 opacity-100"
                    }`}
                  >
                  <button
                    type="button"
                    onClick={() => handleNavClick(id)}
                    aria-label={label}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center justify-center transition-transform duration-200 lg:h-14 lg:w-16 ${
                      isCompact ? "h-10 w-11" : "h-12 w-14"
                    }`}
                  >
                    {/* cell frame */}
                    <span
                      aria-hidden
                      className={`absolute inset-0 border transition-all duration-300 ${
                        isActive
                          ? "border-blood bg-blood/15 shadow-[0_0_16px_-4px_var(--blood)]"
                          : "border-blood/30 bg-blood/[0.04] group-hover:border-blood/60"
                      }`}
                      style={{
                        clipPath: cellClip,
                        ...(isCompact ? { backdropFilter: "blur(10px)" } : {}),
                      }}
                    />
                    {/* bottom tick marks */}
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5"
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-0.5 w-1 ${isActive ? "bg-blood" : "bg-blood/40"}`}
                        />
                      ))}
                    </span>
                    <Icon
                      className={`h-5 w-5 lg:h-6 lg:w-6 transition-all duration-300 group-hover:scale-110 ${
                        isActive
                          ? "text-blood drop-shadow-[0_0_6px_var(--blood)]"
                          : "text-paper group-hover:text-paper"
                      }`}
                    />
                    <span
                      className={`pointer-events-none absolute -bottom-7 whitespace-nowrap font-mono text-[10px] tracking-widest text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                        isCompact ? "hidden" : ""
                      }`}
                    >
                      {label.toUpperCase()}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
