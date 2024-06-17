import type { Metadata } from 'next'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './globals.css'
import { Providers } from './providers'
import { PopAlerts } from '@/components/popAlerts/pop-alerts'

export const metadata: Metadata = {
  title: 'Merge Alerts',
  description: 'Get notified when a merge to main happens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="sunset"
    >
      <body>
        <Providers>
          {children}
          <PopAlerts />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  )
}

