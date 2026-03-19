"use client";

import { useEffect, useState, useRef } from "react";
import { api, Dataset } from "@/lib/api";
import { DATA_TYPES } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Search, Star, Loader2 } from "lucide-react";

export default function MarketplacePage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
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
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  const filtered = datasets.filter((d) => {
    const matchesFilter = !filter || d.data_type === filter;
    const matchesSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left panel */}
      <div className="w-[440px] flex-shrink-0 border-r border-border/60 overflow-y-auto bg-background">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Marketplace</h1>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {filtered.length} datasets
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-border/60"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilter("")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filter === ""
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {DATA_TYPES.map((dt) => (
              <button
                key={dt.value}
                onClick={() => setFilter(dt.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  filter === dt.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {dt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading datasets...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">No datasets found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map((d) => (
              <Link key={d.id} href={`/marketplace/${d.id}`}>
                <div className="group rounded-xl border border-border/60 bg-card p-4 card-hover cursor-pointer">
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                        {d.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-base font-bold text-primary">${d.price}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5">
                      {d.data_type}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                      {d.file_format}
                    </Badge>
                    {d.avg_rating && (
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-600 ml-auto">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        {d.avg_rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Map */}
      <div ref={mapContainer} className="flex-1" />
    </div>
  );
}
