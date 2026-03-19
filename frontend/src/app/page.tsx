import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Brain, DollarSign, Globe, Layers, Crosshair, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-28 sm:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm text-white/70 mb-8">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 200+ exploration teams worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              The marketplace for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                geological exploration
              </span>{" "}
              data
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/60 max-w-2xl">
              Access geophysical surveys, geochemistry, and drill hole data from around the world.
              Run AI-powered drill targeting on any dataset — no PhD required.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/marketplace">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-12 px-8 text-base">
                  Browse Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/targeting">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base backdrop-blur-sm">
                  Try AI Targeting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need for exploration</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From data acquisition to AI-powered targeting, GeoMarket streamlines the entire exploration workflow.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative rounded-2xl border border-border/60 bg-card p-8 card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data Marketplace</h3>
            <p className="text-muted-foreground leading-relaxed">
              Search by location, data type, or survey method. Download magnetics, gravity, EM,
              geochemistry, and drill hole datasets with one click.
            </p>
          </div>
          <div className="group relative rounded-2xl border border-border/60 bg-card p-8 card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 mb-5">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Drill Targeting</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upload your data, pick a deposit model (VMS, porphyry, orogenic Au, Ni-Cu), and get
              ranked drill targets with prospectivity maps. From $50/run.
            </p>
          </div>
          <div className="group relative rounded-2xl border border-border/60 bg-card p-8 card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-5">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Monetize Your Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sitting on legacy survey data? List it on GeoMarket and earn passive revenue. We handle
              payments, delivery, and licensing.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: "2,500+", label: "Datasets Listed", icon: Layers },
              { value: "45", label: "Countries Covered", icon: Globe },
              { value: "850+", label: "AI Targeting Runs", icon: Crosshair },
              { value: "$2.1M", label: "Paid to Data Sellers", icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="relative rounded-2xl bg-card border border-border/60 p-6 text-center card-hover">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-3xl hero-gradient p-12 sm:p-16 text-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative">
            <div className="flex justify-center mb-6">
              <ShieldCheck className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to accelerate your exploration?</h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              Join hundreds of exploration teams already using GeoMarket to find, buy, and analyze geological data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 shadow-lg h-12 px-8 text-base font-semibold">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base backdrop-blur-sm">
                  Explore Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layers className="h-3 w-3" />
              </div>
              GeoMarket
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
              <Link href="/sell" className="hover:text-foreground transition-colors">Sell Data</Link>
              <Link href="/targeting" className="hover:text-foreground transition-colors">AI Targeting</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
