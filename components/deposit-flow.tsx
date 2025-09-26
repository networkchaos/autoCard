"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Smartphone, Copy, AlertCircle, TrendingUp, Loader2, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

export function DepositFlow() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("fiat")
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("USDC")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [depositAddress] = useState("0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4")
  const [swapQuote, setSwapQuote] = useState(null)

  // Mock crypto prices
  const cryptoPrices = {
    USDC: 1.0,
    USDT: 1.0,
    ETH: 2340.56,
    BTC: 43250.0,
  }

  const handleMpesaDeposit = async () => {
    setIsProcessing(true)
    // Simulate M-Pesa STK push
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    // Show success state
  }

  const handleCardDeposit = async () => {
    setIsProcessing(true)
    // Simulate card payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
  }

  const getSwapQuote = async (fromToken: string, amount: string) => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    // Simulate 0x API call
    const mockQuote = {
      fromToken,
      toToken: "USDC",
      fromAmount: amount,
      toAmount: (Number.parseFloat(amount) * cryptoPrices[fromToken as keyof typeof cryptoPrices]).toFixed(2),
      slippage: "0.5%",
      gasFee: "$2.34",
    }
    setSwapQuote(mockQuote as any)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold">Add Funds</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fiat">Fiat</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value="fiat" className="space-y-6 mt-6">
            {/* Amount Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deposit Amount</CardTitle>
                <CardDescription>Enter the amount you want to deposit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="text-2xl h-14 text-center"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["50", "100", "500"].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDepositAmount(amount)}
                      className="bg-transparent"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Method</h3>

              {/* M-Pesa */}
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm text-muted-foreground">Pay with your mobile money</div>
                    </div>
                    <Badge variant="secondary">Popular</Badge>
                  </div>

                  {depositAmount && (
                    <div className="mt-4 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+254 700 000 000"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleMpesaDeposit}
                        disabled={!mpesaPhone || isProcessing}
                        className="w-full"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Processing STK Push...
                          </>
                        ) : (
                          <>
                            <Smartphone className="mr-2 w-4 h-4" />
                            Pay ${depositAmount} via M-Pesa
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Card Payment */}
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Debit/Credit Card</div>
                      <div className="text-sm text-muted-foreground">Visa, Mastercard, and more</div>
                    </div>
                  </div>

                  {depositAmount && (
                    <div className="mt-4">
                      <Button onClick={handleCardDeposit} disabled={isProcessing} className="w-full" size="lg">
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 w-4 h-4" />
                            Pay ${depositAmount} with Card
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6 mt-6">
            {/* Crypto Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Cryptocurrency</CardTitle>
                <CardDescription>Choose the crypto you want to deposit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full" />
                        <span>USDC - ${cryptoPrices.USDC}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="USDT">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full" />
                        <span>USDT - ${cryptoPrices.USDT}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ETH">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full" />
                        <span>ETH - ${cryptoPrices.ETH.toLocaleString()}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="BTC">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-500 rounded-full" />
                        <span>BTC - ${cryptoPrices.BTC.toLocaleString()}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <Label htmlFor="crypto-amount">Amount ({selectedCrypto})</Label>
                  <Input
                    id="crypto-amount"
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => {
                      setDepositAmount(e.target.value)
                      getSwapQuote(selectedCrypto, e.target.value)
                    }}
                    className="text-xl h-12 text-center"
                  />
                </div>

                {swapQuote && selectedCrypto !== "USDC" && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="font-medium text-sm">Auto-Swap Quote</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">You send:</span>
                          <span>
                            {swapQuote.fromAmount} {swapQuote.fromToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">You receive:</span>
                          <span>
                            {swapQuote.toAmount} {swapQuote.toToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Slippage:</span>
                          <span>{swapQuote.slippage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gas fee:</span>
                          <span>{swapQuote.gasFee}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Deposit Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deposit Address</CardTitle>
                <CardDescription>Send {selectedCrypto} to this address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={depositAddress} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(depositAddress)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-amber-800 dark:text-amber-200">Important</div>
                      <div className="text-amber-700 dark:text-amber-300 mt-1">
                        Only send {selectedCrypto} to this address. Sending other tokens may result in permanent loss.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction Watcher */}
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Watching for deposits...</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      We'll automatically detect and credit your deposit
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
