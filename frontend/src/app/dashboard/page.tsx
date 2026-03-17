"use client";

import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted-foreground">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {user.full_name}</p>

      <Tabs defaultValue="purchases">
        <TabsList>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="ai-runs">AI Runs</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchased Datasets</CardTitle>
              <CardDescription>Datasets you have purchased from the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No purchases yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Datasets you have listed for sale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No listings yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-runs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Targeting Runs</CardTitle>
              <CardDescription>Your drill targeting analysis jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No AI runs yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
              <CardDescription>Revenue from your dataset sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">$0.00</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Total Sales</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$0.00</div>
                  <div className="text-sm text-muted-foreground">Pending Payout</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
