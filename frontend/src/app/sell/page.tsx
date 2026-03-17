"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { DATA_TYPES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

      // Upload file directly to S3 via presigned URL
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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sell Your Data</h1>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Dataset Details</CardTitle>
            <CardDescription>Describe your dataset so buyers can find it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={update("title")} placeholder="e.g. Abitibi Magnetics Survey 2024" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full rounded-md border px-3 py-2 text-sm min-h-[100px]"
                value={form.description}
                onChange={update("description")}
                placeholder="Describe the survey area, methodology, resolution..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_type">Data Type</Label>
                <select id="data_type" className="w-full rounded-md border px-3 py-2 text-sm" value={form.data_type} onChange={update("data_type")}>
                  {DATA_TYPES.map((dt) => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file_format">File Format</Label>
                <select id="file_format" className="w-full rounded-md border px-3 py-2 text-sm" value={form.file_format} onChange={update("file_format")}>
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
              <Input id="price" type="number" min={1} value={form.price} onChange={update("price")} />
            </div>
            <Button onClick={() => setStep(2)} className="w-full">Next: Upload File</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Upload File</CardTitle>
            <CardDescription>Select the dataset file to upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block mx-auto text-sm"
              />
              {file && <p className="mt-2 text-sm text-muted-foreground">{file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)</p>}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} disabled={uploading} className="flex-1">
                {uploading ? "Uploading..." : "Submit Dataset"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
