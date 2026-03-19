"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { DATA_TYPES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Upload, ArrowRight, ArrowLeft, CheckCircle, FileText } from "lucide-react";

export default function SellPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    description: "",
    data_type: "magnetics",
    file_format: "geotiff",
    price: 100,
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit() {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const res = await api.createDataset({
        ...form,
        price: Number(form.price),
      });

      await fetch(res.upload_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "application/octet-stream" },
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
            step > 1 ? "bg-primary text-primary-foreground" : step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {step > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
          </div>
          Details
        </div>
        <div className="w-12 h-px bg-border" />
        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
            step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            2
          </div>
          Upload
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">Sell Your Data</h1>
      <p className="text-muted-foreground mb-8">List your geological data on the marketplace and start earning.</p>

      {step === 1 && (
        <Card className="border-border/60 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Dataset Details</CardTitle>
            <CardDescription>Describe your dataset so buyers can find it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={update("title")} placeholder="e.g. Abitibi Magnetics Survey 2024" required className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
                value={form.description}
                onChange={update("description")}
                placeholder="Describe the survey area, methodology, resolution..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_type">Data Type</Label>
                <select
                  id="data_type"
                  className="w-full h-10 rounded-xl border border-border/60 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                  value={form.data_type}
                  onChange={update("data_type")}
                >
                  {DATA_TYPES.map((dt) => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file_format">File Format</Label>
                <select
                  id="file_format"
                  className="w-full h-10 rounded-xl border border-border/60 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                  value={form.file_format}
                  onChange={update("file_format")}
                >
                  <option value="geotiff">GeoTIFF</option>
                  <option value="segy">SEG-Y</option>
                  <option value="xyz">XYZ Grid</option>
                  <option value="gdb">Geosoft GDB</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input id="price" type="number" min={1} value={form.price} onChange={update("price")} className="h-10 pl-7" />
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full h-11 bg-primary hover:bg-primary/90 shadow-sm gap-2">
              Next: Upload File
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-border/60 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Upload File</CardTitle>
            <CardDescription>Select the dataset file to upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl p-10 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              {file ? (
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                  <p className="text-xs text-primary mt-2">Click to change file</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mx-auto mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">Click to upload your file</p>
                  <p className="text-xs text-muted-foreground mt-1">GeoTIFF, SEG-Y, XYZ, GDB, or CSV</p>
                </div>
              )}
            </label>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={uploading || !file} className="flex-1 h-11 bg-primary hover:bg-primary/90 shadow-sm gap-2">
                {uploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    Submit Dataset
                    <Upload className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
