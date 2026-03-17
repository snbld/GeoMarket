import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              The marketplace for geological exploration data
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Access geophysical surveys, geochemistry, and drill hole data from around the world.
              Run AI-powered drill targeting on any dataset — no PhD required.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href="/marketplace">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Browse Marketplace
                </Button>
              </Link>
              <Link href="/targeting">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Try AI Targeting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Data Marketplace</h3>
            <p className="mt-2 text-muted-foreground">
              Search by location, data type, or survey method. Download magnetics, gravity, EM,
              geochemistry, and drill hole datasets with one click.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Drill Targeting</h3>
            <p className="mt-2 text-muted-foreground">
              Upload your data, pick a deposit model (VMS, porphyry, orogenic Au, Ni-Cu), and get
              ranked drill targets with prospectivity maps. From $50/run.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Monetize Your Data</h3>
            <p className="mt-2 text-muted-foreground">
              Sitting on legacy survey data? List it on GeoMarket and earn passive revenue. We handle
              payments, delivery, and licensing.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-sm text-muted-foreground mt-1">Datasets Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">45</div>
              <div className="text-sm text-muted-foreground mt-1">Countries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">850+</div>
              <div className="text-sm text-muted-foreground mt-1">AI Targeting Runs</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$2.1M</div>
              <div className="text-sm text-muted-foreground mt-1">Paid to Data Sellers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
