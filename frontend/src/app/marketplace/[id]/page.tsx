"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api, Dataset } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DatasetDetailPage() {
  const params = useParams();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      api.getDataset(params.id as string).then(setDataset).catch((e) => setError(e.message));
    }
  }, [params.id]);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!dataset) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{dataset.title}</h1>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary">{dataset.data_type}</Badge>
            <Badge variant="outline">{dataset.file_format}</Badge>
            {dataset.crs && <Badge variant="outline">CRS: {dataset.crs}</Badge>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-600">${dataset.price}</div>
          <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">Purchase Dataset</Button>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{dataset.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Downloads</span><span>{dataset.download_count}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span>{dataset.review_count}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span>{dataset.avg_rating?.toFixed(1) || "No ratings"}</span></div>
          </CardContent>
        </Card>

        {dataset.metadata_json && Object.keys(dataset.metadata_json).length > 0 && (
          <Card>
            <CardHeader><CardTitle>Metadata</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {Object.entries(dataset.metadata_json).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span>{String(v)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
