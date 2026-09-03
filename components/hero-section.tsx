"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, FileText, Mail, Heart } from "lucide-react"
import { NavDock } from "@/components/nav-dock"
import { ProfilePortrait } from "@/components/profile-portrait"
import { SocialLinks } from "@/components/social-links"

const ROLES = ["Computer Engineer", "Full Stack Developer"]

const roleClip =
  "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)"

const TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "PostgreSQL",
  "Python",
  "UI/UX",
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 60, y: 40 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [typed, setTyped] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const current = ROLES[roleIndex]

    // add small random jitter to typing speed for a natural feel
    const jitter = (n: number) => Math.max(20, n + Math.round((Math.random() - 0.5) * 30))
    const typeSpeed = jitter(60)
    const deleteSpeed = jitter(36)

    if (!isDeleting) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), typeSpeed)
      } else {
        // pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1000)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), deleteSpeed)
      } else {
        // brief pause, then start typing next role
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setRoleIndex((idx) => (idx + 1) % ROLES.length)
        }, 300)
      }
    }

    return () => clearTimeout(timeout)
  }, [typed, isDeleting, roleIndex])

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setSpotlight({ x: px * 100, y: py * 100 })
    setTilt({ x: (px - 0.5) * 24, y: (py - 0.5) * 24 })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* interactive spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-200"
        style={{
          background: `radial-gradient(680px circle at ${spotlight.x}% ${spotlight.y}%, oklch(0.58 0.21 27 / 0.13), transparent 60%)`,
        }}
      />
      {/* giant faint watermark word behind everything */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-[42%] z-0 select-none font-mono text-[22vw] font-black leading-none tracking-tighter text-white/[0.02] sm:text-[18vw]"
      >
        DEV
      </span>

      <NavDock />

      {/* top-right connection readout */}
      <div className="absolute right-6 top-6 z-20 hidden flex-col items-end gap-1.5 sm:flex sm:right-10">
        <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-blood/80">
          CONNECTION
        </span>
        <Heart
          className="h-5 w-5 fill-blood text-blood"
          style={{ animation: "hero-float 4s ease-in-out infinite" }}
        />
      </div>

      {/* vertical social rail on the left edge */}
      <div className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
        <SocialLinks orientation="vertical" />
      </div>

      {/* MAIN: asymmetric split, text overlaps the portrait panel */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-6 px-6 pb-24 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-0 lg:px-16 lg:pt-24">
        {/* LEFT text column */}
        <div className="relative">
          {/* eyebrow */}
          <div
            className="hero-rise mb-5 flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-10 bg-blood" />
            <span className="font-mono text-xs tracking-[0.35em] text-blood">
              PORTFOLIO / 2026
            </span>
          </div>

          {/* Hi, I'm */}
          <p
            className="hero-rise font-mono text-2xl font-bold text-paper sm:text-3xl"
            style={{ animationDelay: "0.12s" }}
          >
            Hi, I&apos;m
          </p>

          {/* oversized outlined + filled name stack */}
          <h1 className="mt-1">
            <span
              className="hero-rise block font-mono text-5xl font-black leading-[0.92] tracking-tight text-paper sm:text-7xl"
              style={{ animationDelay: "0.2s" }}
            >
              Chrestine
            </span>
            <span
              className="hero-rise -mt-1 block font-mono text-5xl font-black leading-[0.92] tracking-tight text-blood sm:text-7xl"
              style={{
                animationDelay: "0.3s",
                textShadow: "0 0 40px oklch(0.58 0.21 27 / 0.45)",
              }}
            >
              Hiangan
            </span>
          </h1>

          {/* location */}
          <p
            className="hero-rise mt-5 flex items-center gap-2 font-mono text-sm text-blood/90"
            style={{ animationDelay: "0.38s" }}
          >
            <MapPin className="h-4 w-4" />
            Teresa, Rizal, Philippines
          </p>

          {/* role in an angular HUD bracket frame */}
          <div
            className="hero-rise mt-6 inline-block"
            style={{ animationDelay: "0.46s" }}
          >
            <div className="relative">
              {/* glowing bracket border */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-blood via-blood/60 to-blood/90 shadow-[0_0_28px_-8px_var(--blood)]"
                style={{ clipPath: roleClip }}
              />
              <div
                className="relative m-[2px] flex items-center gap-2.5 bg-ink px-5 py-2.5 font-mono text-lg sm:text-2xl"
                style={{ clipPath: roleClip }}
              >
                <span className="text-blood">{"~/role"}</span>
                <span className="text-paper-faint">:</span>
                <span className="font-semibold text-paper whitespace-nowrap sm:whitespace-normal">{typed}</span>
                <span
                  className="inline-block h-6 w-[3px] bg-blood sm:h-7"
                  style={{ animation: "hero-blink 1s step-end infinite" }}
                />
              </div>
            </div>
          </div>

          {/* bio */}
          <p
            className="hero-rise mt-6 max-w-lg text-pretty leading-relaxed text-paper-dim"
            style={{ animationDelay: "0.54s" }}
          >
            I love building colorful, fun, and interactive web experiences using{" "}
            <strong className="font-semibold text-paper">
              programming languages
            </strong>
            ,{" "}
            <strong className="font-semibold text-paper">
              modern technologies
            </strong>
            , and my imagination.
          </p>

          {/* buttons */}
          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            style={{ animationDelay: "0.62s" }}
          >
            <a
              href="/Hiangan_Chrestine_Resume.pdf"
              download
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-ink-soft px-8 py-3.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-blood/15 transition-transform duration-500 group-hover:translate-x-0" />
              <FileText className="relative h-4 w-4" />
              <span className="relative">Resume</span>
            </a>
            <a
              href="#contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-blood px-8 py-3.5 text-sm font-semibold text-blood transition-all duration-300 hover:-translate-y-0.5 hover:bg-blood hover:text-paper hover:shadow-[0_0_28px_-4px_var(--blood)] sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>

          {/* socials inline for non-xl screens */}
          <div
            className="hero-rise mt-10 xl:hidden"
            style={{ animationDelay: "0.7s" }}
          >
            <SocialLinks orientation="horizontal" />
          </div>
        </div>

        {/* RIGHT portrait panel */}
        <div
          className="hero-rise relative flex justify-center lg:justify-end"
          style={{ animationDelay: "0.35s" }}
        >
          <ProfilePortrait tiltX={tilt.x} tiltY={tilt.y} />
        </div>
      </div>

      {/* tech-tag marquee ticker along the bottom */}
      <div className="absolute bottom-0 left-0 z-20 flex w-full items-center overflow-hidden border-t border-white/10 bg-black/50 py-3 backdrop-blur-sm">
          <span className="relative z-10 hidden shrink-0 items-center gap-2 border-r border-blood/30 bg-ink px-5 font-mono text-xs font-semibold tracking-[0.3em] text-blood sm:flex">
          <span className="h-1.5 w-1.5 rotate-45 bg-blood" />
          TECH.STACK
        </span>
        <div className="flex w-max hero-marquee">
          {Array.from({ length: 8 }).flatMap((_, copy) =>
            TAGS.map((tag, i) => (
              <span
                key={`${tag}-${copy}-${i}`}
                className="mx-6 flex items-center gap-3 whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-paper-dim"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-blood" />
                {tag.toUpperCase()}
              </span>
            )),
          )}
        </div>
      </div>

    </section>
  )
}
