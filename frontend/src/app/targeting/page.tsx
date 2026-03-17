"use client";

import { useState } from "react";
import { DEPOSIT_TYPES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TargetingPage() {
  const [depositType, setDepositType] = useState("vms");
  const [files, setFiles] = useState<FileList | null>(null);
  const [areaKm2, setAreaKm2] = useState(500);

  const nLayers = files?.length || 0;
  const estimatedPrice = 50 + areaKm2 * 0.1 + nLayers * 25;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">AI Drill Targeting</h1>
      <p className="text-muted-foreground">
        Upload your geophysical data, select a deposit model, and let our AI identify the highest-priority drill targets.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Configure Run</CardTitle>
          <CardDescription>Select your data and parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Deposit Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {DEPOSIT_TYPES.map((dt) => (
                <button
                  key={dt.value}
                  onClick={() => setDepositType(dt.value)}
                  className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                    depositType === dt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium">{dt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Data Layers</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block mx-auto text-sm"
                accept=".tif,.tiff,.sgy,.segy,.xyz,.gdb,.csv"
              />
              {files && files.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {files.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Approximate Area (km2)</Label>
            <input
              id="area"
              type="range"
              min={10}
              max={5000}
              step={10}
              value={areaKm2}
              onChange={(e) => setAreaKm2(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">{areaKm2} km2</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Estimate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Base fee</span><span>$50.00</span></div>
            <div className="flex justify-between"><span>Area ({areaKm2} km2 x $0.10)</span><span>${(areaKm2 * 0.1).toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Data layers ({nLayers} x $25)</span><span>${(nLayers * 25).toFixed(2)}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-emerald-600">${estimatedPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700" disabled={!files || files.length === 0}>
            Pay & Submit Run
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
