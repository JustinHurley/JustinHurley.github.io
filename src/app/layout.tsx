import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Justin Hurley',
  description: 'Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const savedTheme = localStorage.getItem('theme')
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                  
                  return savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light'
                }

                const theme = getInitialTheme()
                
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark')
                }
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.className} transition-colors`}>{children}</body>
    </html>
  )
}
