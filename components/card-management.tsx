"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Pause,
  Play,
  Settings,
  Smartphone,
  Apple,
  Trash2,
  MapPin,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function CardManagement() {
  const router = useRouter()
  const [showCardNumbers, setShowCardNumbers] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isCreatingCard, setIsCreatingCard] = useState(false)

  // Mock card data
  const cards = [
    {
      id: 1,
      name: "AutoCard Virtual",
      type: "virtual",
      status: "active",
      pan: "4532 1234 5678 9012",
      maskedPan: "4532 •••• •••• 9012",
      cvv: "123",
      expiry: "12/27",
      balance: 1250.0,
      spendingLimit: 2000.0,
      dailyLimit: 500.0,
      monthlySpent: 340.25,
      issuedBy: "Marqeta",
      createdAt: "2024-01-15",
      lastUsed: "2 hours ago",
      controls: {
        isActive: true,
        allowOnline: true,
        allowAtm: false,
        allowInternational: true,
        singleUse: false,
      },
      applePay: true,
      googlePay: false,
    },
    {
      id: 2,
      name: "AutoCard Physical",
      type: "physical",
      status: "shipping",
      pan: "5678 9012 3456 7890",
      maskedPan: "5678 •••• •••• 7890",
      cvv: "456",
      expiry: "08/28",
      balance: 750.0,
      spendingLimit: 1500.0,
      dailyLimit: 300.0,
      monthlySpent: 125.5,
      issuedBy: "Stripe",
      createdAt: "2024-01-20",
      lastUsed: "Never",
      controls: {
        isActive: false,
        allowOnline: true,
        allowAtm: true,
        allowInternational: false,
        singleUse: false,
      },
      applePay: false,
      googlePay: false,
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      cardId: 1,
      merchant: "Starbucks Coffee",
      amount: -5.47,
      currency: "USD",
      timestamp: "2 hours ago",
      status: "completed",
      location: "New York, NY",
      category: "Food & Dining",
    },
    {
      id: 2,
      cardId: 1,
      merchant: "Amazon",
      amount: -29.99,
      currency: "USD",
      timestamp: "1 day ago",
      status: "completed",
      location: "Online",
      category: "Shopping",
    },
    {
      id: 3,
      cardId: 1,
      merchant: "Uber",
      amount: -12.5,
      currency: "USD",
      timestamp: "2 days ago",
      status: "completed",
      location: "San Francisco, CA",
      category: "Transportation",
    },
  ]

  const handleCreateCard = async (cardData: any) => {
    setIsCreatingCard(true)
    // Simulate card creation with issuing provider
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsCreatingCard(false)
    // Add new card to list
  }

  const handleToggleCard = async (cardId: number, isActive: boolean) => {
    // Simulate API call to pause/unpause card
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleAddToWallet = async (cardId: number, walletType: "apple" | "google") => {
    // Simulate tokenization process
    await new Promise((resolve) => setTimeout(resolve, 2000))
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
            <span className="text-lg font-semibold">My Cards</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Card</DialogTitle>
                <DialogDescription>Choose the type of card you want to create</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Virtual Card</div>
                        <div className="text-sm text-muted-foreground">Instant creation, use immediately</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Physical Card</div>
                        <div className="text-sm text-muted-foreground">Ships in 5-7 business days</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6 mt-6">
            {/* Cards List */}
            <div className="space-y-4">
              {cards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  {/* Card Visual */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 relative">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-sm opacity-80">AutoCard</div>
                        <Badge variant={card.type === "virtual" ? "secondary" : "outline"} className="mt-1">
                          {card.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80">Balance</div>
                        <div className="text-lg font-semibold">${card.balance.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="font-mono text-lg tracking-wider">
                        {showCardNumbers ? card.pan : card.maskedPan}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-80">VALID THRU</div>
                          <div className="font-mono">{showCardNumbers ? card.expiry : "••/••"}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">CVV</div>
                          <div className="font-mono">{showCardNumbers ? card.cvv : "•••"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-80">VISA</div>
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          card.status === "active"
                            ? "bg-green-400"
                            : card.status === "shipping"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card Controls */}
                  <CardContent className="p-6 space-y-6">
                    {/* Quick Actions */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCardNumbers(!showCardNumbers)}
                        className="flex items-center space-x-2"
                      >
                        {showCardNumbers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>{showCardNumbers ? "Hide" : "Show"} Details</span>
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleCard(card.id, !card.controls.isActive)}
                        >
                          {card.controls.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Card Status */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <Badge variant={card.status === "active" ? "default" : "secondary"}>{card.status}</Badge>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Used</div>
                        <div>{card.lastUsed}</div>
                      </div>
                    </div>

                    {/* Spending Limits */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Spending Limits</span>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Daily Limit</span>
                          <span>${card.dailyLimit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Spent</span>
                          <span>${card.monthlySpent}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(card.monthlySpent / card.spendingLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Controls */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Card Controls</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Online Purchases</span>
                          <Switch checked={card.controls.allowOnline} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ATM Withdrawals</span>
                          <Switch checked={card.controls.allowAtm} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">International</span>
                          <Switch checked={card.controls.allowInternational} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Single Use</span>
                          <Switch checked={card.controls.singleUse} />
                        </div>
                      </div>
                    </div>

                    {/* Digital Wallets */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Digital Wallets</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={card.applePay ? "default" : "outline"}
                          size="sm"
                          className="flex items-center space-x-2"
                          onClick={() => !card.applePay && handleAddToWallet(card.id, "apple")}
                        >
                          <Apple className="w-4 h-4" />
                          <span>{card.applePay ? "Added" : "Add to"} Apple Pay</span>
                        </Button>
                        <Button
                          variant={card.googlePay ? "default" : "outline"}
                          size="sm"
                          className="flex items-center space-x-2"
                          onClick={() => !card.googlePay && handleAddToWallet(card.id, "google")}
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>{card.googlePay ? "Added" : "Add to"} Google Pay</span>
                        </Button>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <div>Issued by {card.issuedBy}</div>
                          <div>Created {card.createdAt}</div>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete Card
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4 mt-6">
            {/* Transaction Filters */}
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cards</SelectItem>
                  <SelectItem value="1">Virtual Card</SelectItem>
                  <SelectItem value="2">Physical Card</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="30">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>Your card payment history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.merchant}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span>{transaction.timestamp}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {transaction.location}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${Math.abs(transaction.amount).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{transaction.currency}</div>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
