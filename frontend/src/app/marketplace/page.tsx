"use client";

import { useEffect, useState, useRef } from "react";
import { api, Dataset } from "@/lib/api";
import { DATA_TYPES } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MarketplacePage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    api.listDatasets({ limit: 50 }).then(setDatasets).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPLIBRE_STYLE || "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [0, 20],
      zoom: 2,
    });
    map.addControl(new maplibregl.NavigationControl());
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  const filtered = datasets.filter((d) =>
    !filter || d.data_type === filter
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left panel */}
      <div className="w-[420px] flex-shrink-0 border-r overflow-y-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("")}
          >
            All
          </Button>
          {DATA_TYPES.map((dt) => (
            <Button
              key={dt.value}
              variant={filter === dt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(dt.value)}
            >
              {dt.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground text-sm">Loading datasets...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm">No datasets found. Check back soon.</p>
        ) : (
          filtered.map((d) => (
            <Link key={d.id} href={`/marketplace/${d.id}`}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{d.title}</CardTitle>
                    <span className="text-lg font-bold text-emerald-600">${d.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{d.description}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">{d.data_type}</Badge>
                    <Badge variant="outline">{d.file_format}</Badge>
                    {d.avg_rating && (
                      <Badge variant="outline">{d.avg_rating.toFixed(1)} / 5</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Map */}
      <div ref={mapContainer} className="flex-1" />
    </div>
  );
}
