import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Chrestine Hiangan',
  description:
    'Full Stack Developer based in Teresa, Rizal, Philippines. I love building colorful, fun, and interactive web experiences.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/favicon-icon.png',
        type: 'image/png',
      },
      {
        url: '/images/favicon-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon-icon.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/images/favicon-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased bg-ink text-paper font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
