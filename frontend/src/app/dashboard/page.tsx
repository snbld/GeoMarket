"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Layers, Brain, DollarSign, TrendingUp, Package, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="w-full max-w-sm border-border/60 shadow-lg shadow-black/5">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Please sign in to view your dashboard.</p>
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user.full_name}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/sell">
            <Button variant="outline" className="gap-2">
              <Layers className="h-4 w-4" />
              List Dataset
            </Button>
          </Link>
          <Link href="/targeting">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Brain className="h-4 w-4" />
              New AI Run
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Earned", value: "$0.00", icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
          { label: "Total Sales", value: "0", icon: TrendingUp, color: "text-blue-600 bg-blue-100" },
          { label: "Active Listings", value: "0", icon: Package, color: "text-purple-600 bg-purple-100" },
          { label: "AI Runs", value: "0", icon: Brain, color: "text-amber-600 bg-amber-100" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="purchases">
        <TabsList>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="ai-runs">AI Runs</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="mt-6">
          <Card className="border-border/60">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto mb-4">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No purchases yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Browse the marketplace to find geological datasets for your exploration projects.
                </p>
                <Link href="/marketplace">
                  <Button variant="outline" className="gap-2">
                    Browse Marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="mt-6">
          <Card className="border-border/60">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto mb-4">
                  <Layers className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No listings yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Start selling your geological data to earn passive revenue.
                </p>
                <Link href="/sell">
                  <Button variant="outline" className="gap-2">
                    List a Dataset
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-runs" className="mt-6">
          <Card className="border-border/60">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto mb-4">
                  <Brain className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No AI runs yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Upload your geophysical data and let AI identify high-priority drill targets.
                </p>
                <Link href="/targeting">
                  <Button variant="outline" className="gap-2">
                    Start AI Targeting
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Earnings Overview</CardTitle>
              <CardDescription>Revenue from your dataset sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-bold">$0.00</div>
                  <div className="text-sm text-muted-foreground mt-1">Total Earned</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground mt-1">Total Sales</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-bold">$0.00</div>
                  <div className="text-sm text-muted-foreground mt-1">Pending Payout</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
