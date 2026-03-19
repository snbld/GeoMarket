"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileImage, FileSpreadsheet, FileText, Loader2, Crosshair, MapPin, MapIcon, List } from "lucide-react";

export default function AIResultsPage() {
  const params = useParams();
  const [mobileView, setMobileView] = useState<"results" | "map">("results");

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Mobile toggle */}
      <div className="md:hidden flex border-b border-border/60 bg-background">
        <button
          onClick={() => setMobileView("results")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileView === "results" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
          }`}
        >
          <List className="h-4 w-4" />
          Results
        </button>
        <button
          onClick={() => setMobileView("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileView === "map" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
          }`}
        >
          <MapIcon className="h-4 w-4" />
          Map
        </button>
      </div>

      {/* Results sidebar */}
      <div className={`w-full md:w-[400px] flex-shrink-0 md:border-r border-border/60 overflow-y-auto bg-background ${
        mobileView === "map" ? "hidden md:block" : ""
      }`}>
        <div className="p-5 space-y-5">
          {/* Back link */}
          <Link href="/targeting" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Targeting
          </Link>

          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Results</h1>
              <p className="text-xs text-muted-foreground mt-1 font-mono break-all">Job {params.jobId}</p>
            </div>
            <Badge className="bg-amber-100 text-amber-700 border-0 gap-1 flex-shrink-0">
              <Loader2 className="h-3 w-3 animate-spin" />
              Processing
            </Badge>
          </div>

          <Separator className="bg-border/40" />

          {/* Targets */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-primary" />
                Drill Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Targets will appear here once processing is complete.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Downloads */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Downloads</p>
            <Button className="w-full justify-start gap-3 h-10" variant="outline" disabled>
              <FileImage className="h-4 w-4 text-blue-500" />
              Prospectivity GeoTIFF
            </Button>
            <Button className="w-full justify-start gap-3 h-10" variant="outline" disabled>
              <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
              Target Coordinates CSV
            </Button>
            <Button className="w-full justify-start gap-3 h-10" variant="outline" disabled>
              <FileText className="h-4 w-4 text-red-500" />
              Full Report PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className={`flex-1 bg-muted/30 flex items-center justify-center min-h-[300px] ${
        mobileView === "results" ? "hidden md:flex" : ""
      }`}>
        <div className="text-center px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto mb-4">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <p className="text-muted-foreground font-medium">Processing your data...</p>
          <p className="text-sm text-muted-foreground mt-1">The prospectivity map will render here when ready</p>
        </div>
      </div>
    </div>
  );
}
