"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AIResultsPage() {
  const params = useParams();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Results sidebar */}
      <div className="w-[380px] flex-shrink-0 border-r overflow-y-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Results</h1>
          <Badge variant="secondary">Processing</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Job ID: {params.jobId}</p>

        <Card>
          <CardHeader><CardTitle className="text-base">Drill Targets</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Targets will appear here once processing is complete.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button className="w-full" variant="outline" disabled>
            Download GeoTIFF
          </Button>
          <Button className="w-full" variant="outline" disabled>
            Download CSV Targets
          </Button>
          <Button className="w-full" variant="outline" disabled>
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Map area - will show prospectivity heatmap overlay */}
      <div className="flex-1 bg-slate-100 flex items-center justify-center">
        <p className="text-muted-foreground">Prospectivity map will render here</p>
      </div>
    </div>
  );
}
