"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, Dataset } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, MessageSquare, Star, Loader2, ShoppingCart } from "lucide-react";

export default function DatasetDetailPage() {
  const params = useParams();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      api.getDataset(params.id as string).then(setDataset).catch((e) => setError(e.message));
    }
  }, [params.id]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-destructive font-medium">{error}</p>
          <Link href="/marketplace">
            <Button variant="outline" className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Back link */}
      <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{dataset.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary border-0">{dataset.data_type}</Badge>
            <Badge variant="outline">{dataset.file_format}</Badge>
            {dataset.crs && <Badge variant="outline">CRS: {dataset.crs}</Badge>}
          </div>
        </div>
        <Card className="w-full sm:w-auto border-border/60 shadow-lg shadow-black/5">
          <CardContent className="p-6 text-center sm:text-right space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Price</span>
              <div className="text-4xl font-bold text-primary">${dataset.price}</div>
            </div>
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-sm gap-2 h-11 px-6">
              <ShoppingCart className="h-4 w-4" />
              Purchase Dataset
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-border/60" />

      {/* Description */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{dataset.description}</p>
        </CardContent>
      </Card>

      {/* Stats + Metadata grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Dataset Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4" /> Downloads
              </span>
              <span className="font-semibold">{dataset.download_count}</span>
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" /> Reviews
              </span>
              <span className="font-semibold">{dataset.review_count}</span>
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" /> Rating
              </span>
              <span className="font-semibold">
                {dataset.avg_rating ? (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    {dataset.avg_rating.toFixed(1)} / 5
                  </span>
                ) : (
                  <span className="text-muted-foreground font-normal">No ratings yet</span>
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {dataset.metadata_json && Object.keys(dataset.metadata_json).length > 0 && (
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(dataset.metadata_json).map(([k, v], i) => (
                <div key={k}>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">{k}</span>
                    <span className="text-sm font-medium">{String(v)}</span>
                  </div>
                  {i < Object.entries(dataset.metadata_json!).length - 1 && <Separator className="bg-border/40" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
