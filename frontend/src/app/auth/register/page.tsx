"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", full_name: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ ...form, company: form.company || undefined });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="dot-pattern absolute inset-0 -z-10 opacity-40" />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Map className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Geo<span className="text-primary">Market</span>
            </span>
          </Link>
        </div>
        <Card className="border-border/60 shadow-xl shadow-black/5">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Join the geological data marketplace</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" value={form.full_name} onChange={update("full_name")} placeholder="Jane Smith" required className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" required className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input id="company" value={form.company} onChange={update("company")} placeholder="Acme Mining Corp" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={update("password")} placeholder="Min. 8 characters" required minLength={8} className="h-10" />
              </div>
              <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90 shadow-sm" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-sm text-center text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
