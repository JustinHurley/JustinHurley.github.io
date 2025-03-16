import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Justin Hurley',
  description: 'Software Engineer',
}

function setInitialTheme() {
  return {
    __html: `
      (function() {
        try {
          const savedTheme = localStorage.getItem('theme')
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          
          if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (e) {}
      })()
    `,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={setInitialTheme()} />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
