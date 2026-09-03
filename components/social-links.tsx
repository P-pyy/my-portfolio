"use client"

type IconProps = { className?: string }

function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.38-1.86c3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  )
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  )
}

const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/P-pyy", icon: GithubIcon },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/chrestine-hiangan/", icon: LinkedinIcon },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/chrest.hiangan/", icon: FacebookIcon },
]

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

type Props = { orientation?: "horizontal" | "vertical" }

export function SocialLinks({ orientation = "horizontal" }: Props) {
  const vertical = orientation === "vertical"

  return (
    <div className={vertical ? "flex flex-col items-center gap-4" : ""}>
      {vertical ? (
        <span className="font-mono text-[10px] font-semibold tracking-[0.4em] text-blood [writing-mode:vertical-rl]">
          SOCIAL.LINKS
        </span>
      ) : (
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px max-w-[60px] flex-1 bg-gradient-to-r from-transparent to-blood/60" />
          <span className="font-mono text-xs font-semibold tracking-[0.4em] text-blood">
            CONNECT
          </span>
          <span className="h-px max-w-[60px] flex-1 bg-gradient-to-l from-transparent to-blood/60" />
        </div>
      )}

      <ul className={`flex items-center gap-4 ${vertical ? "flex-col" : ""}`}>
        {socials.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              className="group relative flex h-14 w-14 items-center justify-center transition-transform duration-300 hover:-translate-y-1"
            >
              {/* hex border layer */}
              <span
                className="absolute inset-0 bg-blood/40 transition-colors duration-300 group-hover:bg-blood"
                style={{ clipPath: hexClip }}
              />
              {/* hex fill layer */}
              <span
                className="absolute inset-[1.5px] bg-ink-soft transition-colors duration-300 group-hover:bg-blood/15"
                style={{ clipPath: hexClip }}
              />
              <Icon className="relative h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-paper" />
            </a>
          </li>
        ))}
      </ul>

      {vertical && <span className="h-10 w-px bg-gradient-to-b from-blood/60 to-transparent" />}
    </div>
  )
}
