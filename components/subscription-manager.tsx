"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { ArrowLeft, Calendar, Plus, Pause, Play, Settings, CheckCircle, TrendingUp, Zap, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export function SubscriptionManager() {
  const router = useRouter()
  const [autoTopupEnabled, setAutoTopupEnabled] = useState(true)
  const [topupAmount, setTopupAmount] = useState("100")
  const [topupThreshold, setTopupThreshold] = useState("50")

  // Mock subscription data
  const subscriptions = [
    {
      id: 1,
      name: "Netflix",
      merchant: "Netflix Inc.",
      amount: 15.99,
      currency: "USD",
      frequency: "monthly",
      nextPayment: "2024-01-15",
      status: "active",
      category: "Entertainment",
      cardUsed: "Virtual Card ••••4532",
      autoTopup: true,
      icon: "🎬",
      totalSpent: 191.88,
      paymentsCount: 12,
      lastPayment: "2023-12-15",
    },
    {
      id: 2,
      name: "Spotify Premium",
      merchant: "Spotify AB",
      amount: 9.99,
      currency: "USD",
      frequency: "monthly",
      nextPayment: "2024-01-18",
      status: "active",
      category: "Music",
      cardUsed: "Virtual Card ••••4532",
      autoTopup: true,
      icon: "🎵",
      totalSpent: 119.88,
      paymentsCount: 12,
      lastPayment: "2023-12-18",
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      merchant: "Adobe Systems",
      amount: 52.99,
      currency: "USD",
      frequency: "monthly",
      nextPayment: "2024-01-22",
      status: "paused",
      category: "Software",
      cardUsed: "Physical Card ••••8901",
      autoTopup: false,
      icon: "🎨",
      totalSpent: 317.94,
      paymentsCount: 6,
      lastPayment: "2023-11-22",
    },
    {
      id: 4,
      name: "GitHub Pro",
      merchant: "GitHub Inc.",
      amount: 4.0,
      currency: "USD",
      frequency: "monthly",
      nextPayment: "2024-01-25",
      status: "active",
      category: "Developer Tools",
      cardUsed: "Virtual Card ••••4532",
      autoTopup: true,
      icon: "💻",
      totalSpent: 48.0,
      paymentsCount: 12,
      lastPayment: "2023-12-25",
    },
  ]

  const upcomingPayments = subscriptions
    .filter((sub) => sub.status === "active")
    .sort((a, b) => new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime())
    .slice(0, 5)

  const monthlyTotal = subscriptions
    .filter((sub) => sub.status === "active")
    .reduce((total, sub) => total + sub.amount, 0)

  const handleToggleSubscription = async (subscriptionId: number, currentStatus: string) => {
    // Simulate API call to pause/resume subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleCancelSubscription = async (subscriptionId: number) => {
    // Simulate API call to cancel subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "paused":
        return "secondary"
      case "cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getDaysUntilPayment = (nextPayment: string) => {
    const days = Math.ceil((new Date(nextPayment).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
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
            <span className="text-lg font-semibold">Subscriptions</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Subscription</DialogTitle>
                <DialogDescription>Set up automatic payments for a new subscription</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="merchant">Merchant Name</Label>
                  <Input id="merchant" placeholder="e.g., Netflix, Spotify" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card">Payment Card</Label>
                  <Select defaultValue="virtual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual Card ••••4532</SelectItem>
                      <SelectItem value="physical">Physical Card ••••8901</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Add Subscription</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">All Subscriptions</TabsTrigger>
            <TabsTrigger value="settings">Auto-Topup</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Monthly Summary */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
                <CardDescription>Your subscription spending overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {subscriptions.filter((s) => s.status === "active").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Subscriptions</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-success">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Auto-topup enabled for seamless payments</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Payments</CardTitle>
                <CardDescription>Your next subscription charges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingPayments.map((subscription) => {
                  const daysUntil = getDaysUntilPayment(subscription.nextPayment)
                  return (
                    <div
                      key={subscription.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                          {subscription.icon}
                        </div>
                        <div>
                          <div className="font-medium">{subscription.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${subscription.amount}</div>
                        <div className="text-sm text-muted-foreground">{subscription.cardUsed}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    $
                    {subscriptions
                      .filter((s) => s.status === "active")
                      .reduce((total, sub) => total + sub.amount, 0)
                      .toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Saved</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">$127.45</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 mt-6">
            {/* Subscriptions List */}
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
                          {subscription.icon}
                        </div>
                        <div>
                          <div className="font-medium text-lg">{subscription.name}</div>
                          <div className="text-sm text-muted-foreground">{subscription.merchant}</div>
                          <Badge variant={getStatusColor(subscription.status) as any} className="mt-1">
                            {subscription.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">${subscription.amount}</div>
                        <div className="text-sm text-muted-foreground">/{subscription.frequency}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Next Payment</div>
                        <div className="font-medium">{new Date(subscription.nextPayment).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Payment Card</div>
                        <div className="font-medium">{subscription.cardUsed}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Spent</div>
                        <div className="font-medium">${subscription.totalSpent}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Payments Made</div>
                        <div className="font-medium">{subscription.paymentsCount}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Auto-topup</span>
                          <Switch checked={subscription.autoTopup} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleSubscription(subscription.id, subscription.status)}
                        >
                          {subscription.status === "active" ? (
                            <>
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Resume
                            </>
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            {/* Auto-Topup Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auto-Topup Settings</CardTitle>
                <CardDescription>Automatically add funds when your balance runs low</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Auto-Topup</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically add funds to ensure subscription payments never fail
                    </div>
                  </div>
                  <Switch checked={autoTopupEnabled} onCheckedChange={setAutoTopupEnabled} />
                </div>

                {autoTopupEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="threshold">Topup When Balance Below</Label>
                        <Select value={topupThreshold} onValueChange={setTopupThreshold}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">$25</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="200">$200</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Topup Amount</Label>
                        <Select value={topupAmount} onValueChange={setTopupAmount}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="200">$200</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Funding Source</Label>
                      <Select defaultValue="mpesa">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mpesa">M-Pesa (Primary)</SelectItem>
                          <SelectItem value="card">Debit Card ••••1234</SelectItem>
                          <SelectItem value="crypto">USDC Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-blue-900 dark:text-blue-100">Auto-Topup Active</div>
                          <div className="text-blue-700 dark:text-blue-300 mt-1">
                            When your balance drops below ${topupThreshold}, we'll automatically add ${topupAmount} from
                            your M-Pesa account
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Spending Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spending Controls</CardTitle>
                <CardDescription>Set limits and controls for subscription payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Subscription Limit</Label>
                    <Select defaultValue="500">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">$200</SelectItem>
                        <SelectItem value="500">$500</SelectItem>
                        <SelectItem value="1000">$1,000</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>New Subscription Approval</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-approve</SelectItem>
                        <SelectItem value="manual">Manual approval</SelectItem>
                        <SelectItem value="block">Block new subscriptions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Failed Payment Notifications</div>
                    <div className="text-sm text-muted-foreground">Get notified when subscription payments fail</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Price Change Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified when subscription prices increase</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid gap-4">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">Fraud Protection</div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        All subscription payments are monitored for unusual activity
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">Smart Retry</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Failed payments are automatically retried with intelligent timing
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
