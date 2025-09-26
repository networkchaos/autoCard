"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  CreditCard,
  Send,
  Calendar,
  TrendingUp,
  Eye,
  EyeOff,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  Bell,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function Dashboard() {
  const router = useRouter()
  const [balanceVisible, setBalanceVisible] = useState(true)

  // Mock data
  const totalBalance = 12847.32
  const onChainBalance = 8234.56
  const fiatReserve = 4612.76
  const yieldEarned = 234.89

  const recentTransactions = [
    {
      id: 1,
      type: "card_payment",
      merchant: "Starbucks Coffee",
      amount: -5.47,
      currency: "USD",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "deposit",
      merchant: "USDC Deposit",
      amount: 500.0,
      currency: "USDC",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "yield",
      merchant: "Yield Farming",
      amount: 12.34,
      currency: "USD",
      timestamp: "2 days ago",
      status: "completed",
    },
    {
      id: 4,
      type: "send",
      merchant: "Send by Link",
      amount: -25.0,
      currency: "USD",
      timestamp: "3 days ago",
      status: "completed",
    },
  ]

  const activeCards = [
    {
      id: 1,
      name: "AutoCard Virtual",
      last4: "4532",
      type: "virtual",
      status: "active",
      balance: 1250.0,
    },
    {
      id: 2,
      name: "AutoCard Physical",
      last4: "8901",
      type: "physical",
      status: "active",
      balance: 750.0,
    },
  ]

  const upcomingSubscriptions = [
    {
      id: 1,
      name: "Netflix",
      amount: 15.99,
      nextPayment: "Dec 15",
      status: "active",
    },
    {
      id: 2,
      name: "Spotify",
      amount: 9.99,
      nextPayment: "Dec 18",
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">AutoCard</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Balance Overview */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setBalanceVisible(!balanceVisible)}
              >
                {balanceVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold mb-4">
              {balanceVisible ? `$${totalBalance.toLocaleString()}` : "••••••"}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">On-Chain</div>
                <div className="text-lg font-semibold">
                  {balanceVisible ? `$${onChainBalance.toLocaleString()}` : "••••••"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Fiat Reserve</div>
                <div className="text-lg font-semibold">
                  {balanceVisible ? `$${fiatReserve.toLocaleString()}` : "••••••"}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-success">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+${yieldEarned} yield earned this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-14 flex-col space-y-1" size="lg" onClick={() => router.push("/deposit")}>
            <Plus className="w-5 h-5" />
            <span className="text-xs">Add Funds</span>
          </Button>
          <Button
            className="h-14 flex-col space-y-1 bg-transparent"
            variant="outline"
            size="lg"
            onClick={() => router.push("/cards")}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Create Card</span>
          </Button>
          <Button
            className="h-14 flex-col space-y-1 bg-transparent"
            variant="outline"
            size="lg"
            onClick={() => router.push("/send")}
          >
            <Send className="w-5 h-5" />
            <span className="text-xs">Send by Link</span>
          </Button>
          <Button
            className="h-14 flex-col space-y-1 bg-transparent"
            variant="outline"
            size="lg"
            onClick={() => router.push("/subscriptions")}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Subscriptions</span>
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>Your latest payment activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        {transaction.type === "card_payment" && <CreditCard className="w-4 h-4" />}
                        {transaction.type === "deposit" && <ArrowDownLeft className="w-4 h-4 text-success" />}
                        {transaction.type === "yield" && <TrendingUp className="w-4 h-4 text-success" />}
                        {transaction.type === "send" && <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{transaction.merchant}</div>
                        <div className="text-xs text-muted-foreground">{transaction.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-medium text-sm ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">{transaction.currency}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Subscriptions</CardTitle>
                <CardDescription>Your scheduled payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{subscription.name}</div>
                        <div className="text-xs text-muted-foreground">Next: {subscription.nextPayment}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">${subscription.amount}</div>
                      <Badge variant="secondary" className="text-xs">
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-4 mt-6">
            {/* Active Cards */}
            <div className="space-y-4">
              {activeCards.map((card) => (
                <Card key={card.id} className="bg-gradient-to-r from-card to-muted/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-medium">{card.name}</div>
                        <div className="text-sm text-muted-foreground">•••• •••• •••• {card.last4}</div>
                      </div>
                      <Badge variant={card.type === "virtual" ? "secondary" : "outline"}>{card.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">Available Balance</div>
                        <div className="text-lg font-semibold">${card.balance.toLocaleString()}</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            {/* All Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Activity</CardTitle>
                <CardDescription>Complete transaction history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        {transaction.type === "card_payment" && <CreditCard className="w-5 h-5" />}
                        {transaction.type === "deposit" && <ArrowDownLeft className="w-5 h-5 text-success" />}
                        {transaction.type === "yield" && <TrendingUp className="w-5 h-5 text-success" />}
                        {transaction.type === "send" && <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.merchant}</div>
                        <div className="text-sm text-muted-foreground">{transaction.timestamp}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">{transaction.currency}</div>
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
