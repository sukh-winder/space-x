export type Status =
  | "active"
  | "inactive"
  | "unknown"
  | "retired"
  | "lost"
  | "under construction"
  | "success"
  | "upcoming"
  | "na";

export interface MapLocation {
  latitude: number;
  longitude: number;
  name?: string;
}
