"use client"

import ClientEmotionProvider from '../components/ClientEmotionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientEmotionProvider>{children}</ClientEmotionProvider>
      </body>
    </html>
  )
}
