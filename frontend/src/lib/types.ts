export interface AIJob {
  id: string;
  deposit_type: string;
  area_km2: number | null;
  n_layers: number | null;
  price: number;
  status: string;
  result_summary: Record<string, unknown> | null;
  created_at: string;
  completed_at: string | null;
}

export interface DrillTarget {
  id: string;
  rank: number;
  score: number;
  uncertainty: number | null;
  reasoning: string | null;
  longitude: number;
  latitude: number;
}

export interface Review {
  id: string;
  user_id: string;
  dataset_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export const DATA_TYPES = [
  { value: "magnetics", label: "Magnetics" },
  { value: "gravity", label: "Gravity" },
  { value: "em", label: "Electromagnetics" },
  { value: "geochemistry", label: "Geochemistry" },
  { value: "drillhole", label: "Drill Holes" },
  { value: "seismic", label: "Seismic" },
] as const;

export const DEPOSIT_TYPES = [
  { value: "vms", label: "VMS (Volcanogenic Massive Sulphide)" },
  { value: "porphyry_cu", label: "Porphyry Copper" },
  { value: "orogenic_au", label: "Orogenic Gold" },
  { value: "ni_cu_magmatic", label: "Ni-Cu Magmatic" },
] as const;
