"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertCircle, Wallet, CreditCard, Zap, Shield, ExternalLink } from "lucide-react"

interface ClaimLinkProps {
  linkId: string
}

export function ClaimLink({ linkId }: ClaimLinkProps) {
  const [linkData, setLinkData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimMethod, setClaimMethod] = useState("instant")
  const [walletAddress, setWalletAddress] = useState("")

  // Mock link data
  useEffect(() => {
    const fetchLinkData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData = {
        id: linkId,
        amount: 50.0,
        message: "Thanks for dinner! 🍕",
        sender: "John Doe",
        status: "active",
        expiresAt: "2024-01-16T10:00:00Z",
        createdAt: "2024-01-15T10:00:00Z",
      }

      setLinkData(mockData as any)
      setIsLoading(false)
    }

    fetchLinkData()
  }, [linkId])

  const handleInstantClaim = async () => {
    setIsClaiming(true)
    // Simulate instant claim (custodial)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsClaiming(false)
    // Show success state
  }

  const handleOnChainClaim = async () => {
    setIsClaiming(true)
    // Simulate gasless on-chain claim with meta-tx
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsClaiming(false)
    // Show success state
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-muted-foreground">Loading payment link...</div>
        </div>
      </div>
    )
  }

  if (!linkData || linkData.status === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-xl">Link Expired</CardTitle>
            <CardDescription>This payment link has expired or is no longer valid</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (linkData.status === "claimed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-xl">Already Claimed</CardTitle>
            <CardDescription>This payment has already been claimed</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const timeUntilExpiry = new Date(linkData.expiresAt).getTime() - Date.now()
  const hoursUntilExpiry = Math.floor(timeUntilExpiry / (1000 * 60 * 60))

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Payment Info */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">${linkData.amount}</CardTitle>
              <CardDescription>from {linkData.sender}</CardDescription>
            </CardHeader>
            {linkData.message && (
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground mb-1">Message</div>
                  <div className="font-medium">{linkData.message}</div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Expiry Warning */}
          {hoursUntilExpiry < 24 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <div className="text-sm">
                  <div className="font-medium text-amber-800 dark:text-amber-200">
                    Expires in {hoursUntilExpiry} hours
                  </div>
                  <div className="text-amber-700 dark:text-amber-300">Claim soon to avoid expiration</div>
                </div>
              </div>
            </div>
          )}

          {/* Claim Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Claim Your Payment</CardTitle>
              <CardDescription>Choose how you'd like to receive your funds</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={claimMethod} onValueChange={setClaimMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="instant">Instant</TabsTrigger>
                  <TabsTrigger value="onchain">On-Chain</TabsTrigger>
                </TabsList>

                <TabsContent value="instant" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <div className="font-medium">Instant Claim</div>
                        <div className="text-sm text-muted-foreground">
                          Get your funds immediately in a custodial AutoCard account
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span>${linkData.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="text-success">Free</span>
                      </div>
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between font-medium">
                          <span>You Receive</span>
                          <span>${linkData.amount}</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleInstantClaim} disabled={isClaiming} className="w-full h-12" size="lg">
                      {isClaiming ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 w-4 h-4" />
                          Claim Instantly
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center">
                      Funds will be available in your AutoCard account immediately
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="onchain" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Gasless On-Chain Claim</div>
                        <div className="text-sm text-muted-foreground">
                          Receive tokens directly to your wallet without gas fees
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wallet">Your Wallet Address</Label>
                      <Input
                        id="wallet"
                        placeholder="0x..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span>${linkData.amount} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gas Fee</span>
                        <span className="text-success">Sponsored</span>
                      </div>
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between font-medium">
                          <span>You Receive</span>
                          <span>${linkData.amount} USDC</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleOnChainClaim}
                      disabled={isClaiming || !walletAddress}
                      className="w-full h-12"
                      size="lg"
                    >
                      {isClaiming ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wallet className="mr-2 w-4 h-4" />
                          Claim to Wallet
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center">
                      Powered by meta-transaction relayers for gasless claiming
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* AutoCard Promo */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Get AutoCard</div>
                  <div className="text-sm text-muted-foreground">Create your own crypto-enabled debit card</div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
