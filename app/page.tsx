"use client"

import { useState } from "react"
import { WalletAuthScreen } from "@/components/wallet-auth-screen"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (isAuthenticated) {
    return <Dashboard />
  }

  return <WalletAuthScreen onConnect={() => setIsAuthenticated(true)} />
}
