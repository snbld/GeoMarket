"use client";

import { useState } from "react";
import { DEPOSIT_TYPES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Upload, FileText, Zap, CreditCard } from "lucide-react";

const DEPOSIT_ICONS: Record<string, string> = {
  vms: "Cu-Zn",
  porphyry_cu: "Cu-Mo",
  orogenic_au: "Au",
  ni_cu_magmatic: "Ni-Cu",
};

export default function TargetingPage() {
  const [depositType, setDepositType] = useState("vms");
  const [files, setFiles] = useState<FileList | null>(null);
  const [areaKm2, setAreaKm2] = useState(500);

  const nLayers = files?.length || 0;
  const estimatedPrice = 50 + areaKm2 * 0.1 + nLayers * 25;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Brain className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">AI Drill Targeting</h1>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Upload your geophysical data, select a deposit model, and let our AI identify the highest-priority drill targets with prospectivity maps.
        </p>
      </div>

      {/* Configure */}
      <Card className="border-border/60 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Configure Run
          </CardTitle>
          <CardDescription>Select your data and parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Deposit type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Deposit Type</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPOSIT_TYPES.map((dt) => (
                <button
                  key={dt.value}
                  onClick={() => setDepositType(dt.value)}
                  className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                    depositType === dt.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/60 hover:border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${
                      depositType === dt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {DEPOSIT_ICONS[dt.value] || "?"}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{dt.label}</div>
                    </div>
                  </div>
                  {depositType === dt.value && (
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* File upload */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Upload Data Layers</Label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl p-8 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="hidden"
                accept=".tif,.tiff,.sgy,.segy,.xyz,.gdb,.csv"
              />
              {files && files.length > 0 ? (
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">{files.length} file(s) selected</p>
                  <p className="text-xs text-primary mt-1">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mx-auto mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">Click to upload data layers</p>
                  <p className="text-xs text-muted-foreground mt-1">TIF, SEG-Y, XYZ, GDB, or CSV</p>
                </div>
              )}
            </label>
          </div>

          {/* Area slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="area" className="text-sm font-semibold">Approximate Area</Label>
              <span className="text-sm font-medium text-primary">{areaKm2.toLocaleString()} km&sup2;</span>
            </div>
            <input
              id="area"
              type="range"
              min={10}
              max={5000}
              step={10}
              value={areaKm2}
              onChange={(e) => setAreaKm2(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 km&sup2;</span>
              <span>5,000 km&sup2;</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price estimate */}
      <Card className="border-border/60 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Price Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-muted-foreground">Base fee</span>
              <span className="font-medium">$50.00</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-muted-foreground">Area ({areaKm2.toLocaleString()} km&sup2; &times; $0.10)</span>
              <span className="font-medium">${(areaKm2 * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-muted-foreground">Data layers ({nLayers} &times; $25)</span>
              <span className="font-medium">${(nLayers * 25).toFixed(2)}</span>
            </div>
            <div className="border-t border-border/60 pt-3 flex justify-between items-center">
              <span className="font-semibold text-base">Total</span>
              <span className="text-2xl font-bold text-primary">${estimatedPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90 shadow-sm text-base gap-2"
            disabled={!files || files.length === 0}
          >
            <Zap className="h-4 w-4" />
            Pay & Submit Run
          </Button>
          {(!files || files.length === 0) && (
            <p className="text-xs text-center text-muted-foreground">Upload at least one data layer to continue</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
