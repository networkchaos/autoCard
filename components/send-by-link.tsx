"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Send, Copy, Share2, Clock, Shield, Zap, CheckCircle, MessageSquare, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dashboard } from "./dashboard"

export function SendByLink() {
  const router = useRouter()
  const [sendAmount, setSendAmount] = useState("")
  const [recipientMessage, setRecipientMessage] = useState("")
  const [expiryHours, setExpiryHours] = useState("24")
  const [isCreating, setIsCreating] = useState(false)
  const [createdLink, setCreatedLink] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock data
  const balance = 1250.0
  const recentSends = [
    {
      id: 1,
      amount: 50.0,
      recipient: "John Doe",
      status: "claimed",
      createdAt: "2 hours ago",
      claimedAt: "1 hour ago",
      link: "https://autocard.app/claim/abc123",
    },
    {
      id: 2,
      amount: 25.0,
      recipient: "Sarah Wilson",
      status: "pending",
      createdAt: "1 day ago",
      expiresAt: "23 hours",
      link: "https://autocard.app/claim/def456",
    },
    {
      id: 3,
      amount: 100.0,
      recipient: "Mike Johnson",
      status: "expired",
      createdAt: "3 days ago",
      expiredAt: "2 days ago",
      link: "https://autocard.app/claim/ghi789",
    },
  ]

  const handleCreateLink = async () => {
    setIsCreating(true)

    // Simulate backend API call to create send link
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockLink = {
      id: Date.now(),
      amount: Number.parseFloat(sendAmount),
      message: recipientMessage,
      link: `https://autocard.app/claim/${Math.random().toString(36).substr(2, 9)}`,
      expiresIn: `${expiryHours} hours`,
      qrCode: "mock-qr-code-data",
    }

    setCreatedLink(mockLink as any)
    setIsCreating(false)
    setShowSuccess(true)
  }

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
  }

  const handleShareLink = (link: string, amount: number) => {
    if (navigator.share) {
      navigator.share({
        title: "AutoCard Payment Link",
        text: `You've received $${amount} via AutoCard!`,
        url: link,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => router.back(Dashboard)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold">Send by Link</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Balance: ${balance.toLocaleString()}
          </Badge>
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send Money</TabsTrigger>
            <TabsTrigger value="history">Send History</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6 mt-6">
            {/* Send Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Payment Link</CardTitle>
                <CardDescription>Send money instantly via shareable link</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="text-2xl h-14 text-center"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {["10", "25", "50", "100"].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setSendAmount(amount)}
                        className="bg-transparent"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a note for the recipient..."
                    value={recipientMessage}
                    onChange={(e) => setRecipientMessage(e.target.value)}
                    className="min-h-20"
                  />
                </div>

                {/* Expiry */}
                <div className="space-y-2">
                  <Label>Link Expires In</Label>
                  <Select value={expiryHours} onValueChange={setExpiryHours}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="72">3 days</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fee Information */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Send Amount</span>
                    <span>${sendAmount || "0.00"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Deducted</span>
                      <span>${sendAmount || "0.00"}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateLink}
                  disabled={!sendAmount || Number.parseFloat(sendAmount) <= 0 || isCreating}
                  className="w-full h-12"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <Clock className="mr-2 w-4 h-4 animate-spin" />
                      Creating Link...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Create Payment Link
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid gap-4">
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">Instant & Gasless</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Recipients can claim instantly without gas fees or wallet setup
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">Secure & Expiring</div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Links automatically expire and unused funds are returned
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            {/* Send History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Sends</CardTitle>
                <CardDescription>Your payment link history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSends.map((send) => (
                  <div
                    key={send.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">${send.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {send.recipient} • {send.createdAt}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              send.status === "claimed"
                                ? "default"
                                : send.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {send.status}
                          </Badge>
                          {send.status === "pending" && (
                            <span className="text-xs text-muted-foreground">Expires in {send.expiresAt}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleCopyLink(send.link)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShareLink(send.link, send.amount)}>
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-center">Payment Link Created!</DialogTitle>
            <DialogDescription className="text-center">
              Share this link with the recipient to send ${createdLink?.amount}
            </DialogDescription>
          </DialogHeader>

          {createdLink && (
            <div className="space-y-4">
              {/* QR Code */}
              <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
                <QrCode className="w-32 h-32 text-muted-foreground" />
              </div>

              {/* Link */}
              <div className="space-y-2">
                <Label>Payment Link</Label>
                <div className="flex items-center space-x-2">
                  <Input value={createdLink.link} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={() => handleCopyLink(createdLink.link)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShareLink(createdLink.link, createdLink.amount)}
                  className="flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const message = `You've received $${createdLink.amount} via AutoCard! Claim here: ${createdLink.link}`
                    window.open(`sms:?body=${encodeURIComponent(message)}`, "_blank")
                  }}
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>SMS</span>
                </Button>
              </div>

              {/* Expiry Info */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-amber-800 dark:text-amber-200">
                      Expires in {createdLink.expiresIn}
                    </div>
                    <div className="text-amber-700 dark:text-amber-300">
                      Unused funds will be returned to your balance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
