// helpers
export type UUID = string;
export type DatePrecision =
  | "half"
  | "quarter"
  | "year"
  | "month"
  | "day"
  | "hour";

// Primitive-ish nested objects
export interface Failure {
  time?: number | null; // may be absent or null
  altitude?: number | null;
  reason?: string | null;
}

export interface Fairings {
  reused?: boolean | null;
  recovery_attempt?: boolean | null;
  recovered?: boolean | null;
  ships?: UUID[]; // array of UUID strings
}

export interface CrewMember {
  crew?: UUID | null; // crew id (uuid) or null
  role?: string | null;
}

export interface Core {
  core?: UUID | null;
  flight?: number | null;
  gridfins?: boolean | null;
  legs?: boolean | null;
  reused?: boolean | null;
  landing_attempt?: boolean | null;
  landing_success?: boolean | null;
  landing_type?: string | null;
  landpad?: UUID | null;
}

/* Links subtree */
export interface Patch {
  small?: string | null;
  large?: string | null;
}

export interface Reddit {
  campaign?: string | null;
  launch?: string | null;
  media?: string | null;
  recovery?: string | null;
}

export interface Flickr {
  small?: string[]; // array of URLs (strings)
  original?: string[]; // array of URLs (strings)
}

export interface Links {
  patch?: Patch;
  reddit?: Reddit;
  flickr?: Flickr;
  presskit?: string | null;
  webcast?: string | null;
  youtube_id?: string | null;
  article?: string | null;
  wikipedia?: string | null;
}

/* Main Launch interface matching your schema */
export interface Launch {
  id: UUID;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: DatePrecision;
  static_fire_date_utc?: string | null;
  static_fire_date_unix?: number | null;
  tdb?: boolean | null;
  net?: boolean | null;
  window?: number | null;
  rocket?: UUID | null;
  success?: boolean | null;
  failures?: Failure[]; // array of failure objects
  upcoming: boolean;
  details?: string | null;
  fairings?: Fairings | null;
  crew?: CrewMember[]; // list of crew objects
  ships?: UUID[]; // list of ship UUIDs
  capsules?: UUID[]; // list of capsule UUIDs
  payloads?: UUID[]; // list of payload UUIDs
  launchpad?: UUID | null;
  cores?: Core[]; // array of core objects
  links?: Links | null;
  auto_update?: boolean | null;
}
