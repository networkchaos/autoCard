import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: "AutoCard - Crypto-Enabled Debit Cards",
  description: "Seamlessly bridge crypto and traditional payments with AutoCard",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased"><ThirdwebProvider>{children}</ThirdwebProvider></body>
    </html>
  )
}
