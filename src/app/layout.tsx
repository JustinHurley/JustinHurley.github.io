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
          const darkMode = localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
          if (darkMode) {
            document.documentElement.classList.add('dark')
          }
        } catch (e) {
          console.error('Error setting initial theme:', e)
        }
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
