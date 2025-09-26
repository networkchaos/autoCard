"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, CreditCard, ArrowRight, CheckCircle } from "lucide-react"
import { client } from "../app/client"
import { ConnectButton } from "thirdweb/react"

interface WalletAuthScreenProps {
  onConnect: () => void
}

export function WalletAuthScreen({ onConnect }: WalletAuthScreenProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  if (isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl">Welcome to AutoCard</CardTitle>
            <CardDescription>Your wallet is connected and ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              Continue to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="ml-3 text-2xl font-bold">AutoCard</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">
              Finance without
              <br />
              <span className="text-primary">the middleman</span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Bridge crypto and traditional payments with instant, secure debit cards. Your digital assets, everywhere
              cards are accepted.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Badge variant="secondary" className="px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Self-Custody
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Instant Settlement
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <CreditCard className="w-3 h-3 mr-1" />
                Global Acceptance
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
              <CardDescription>Secure, non-custodial authentication using your crypto wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardContent className="space-y-4">
              <ConnectButton
                client={client}
                onConnect={() => {
                  setIsConnecting(true)
                  onConnect()
                  setIsConnected(true)
                }}
                disabled={isConnecting}
                className="w-full h-12 text-base" // 
                size="lg"                        // 
              />
            </CardContent>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 text-base bg-transparent" size="lg"
              onClick={() => router.push("/self")}>
                <Shield className="mr-2 w-5 h-5" />
                Self ZK Identity
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-6">Why Choose AutoCard?</h3>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Non-Custodial Security</h4>
                  <p className="text-sm text-muted-foreground">You control your keys and funds at all times</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Instant Settlements</h4>
                  <p className="text-sm text-muted-foreground">Real-time conversion and payment processing</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Universal Acceptance</h4>
                  <p className="text-sm text-muted-foreground">Use anywhere Visa/Mastercard is accepted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
