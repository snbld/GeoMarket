"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Map, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Map className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Geo<span className="text-primary">Market</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/marketplace"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Marketplace
            </Link>
            <Link
              href="/sell"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Sell Data
            </Link>
            <Link
              href="/targeting"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              AI Targeting
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {user.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  {user.full_name}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1">
          <Link href="/marketplace" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
            Marketplace
          </Link>
          <Link href="/sell" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
            Sell Data
          </Link>
          <Link href="/targeting" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
            AI Targeting
          </Link>
          <div className="pt-3 border-t border-border/50 flex gap-2">
            {user ? (
              <>
                <Link href="/dashboard" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{user.full_name}</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
