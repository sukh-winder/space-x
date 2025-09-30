import { LaunchesPagination } from "./launchesPagination";

// helper types
export type UUID = string;

export interface Launchpad {
  // optional server id (many APIs include it)
  id?: UUID;

  name?: string | null; // default: null
  full_name?: string | null; // default: null

  // required enum
  status: LaunchpadStatus;

  type?: string | null;
  locality?: string | null;
  region?: string | null;
  timezone?: string | null;
  images: {
    large: string[];
    small?: string[]; // sometimes only large images are provided
  };

  latitude?: number | null;
  longitude?: number | null;

  // defaults are numbers (0) — keep as number; mark optional if server may omit them
  launch_attempts?: number;
  launch_successes?: number;

  wikipedia?: string | null;
  details?: string | null;

  // array of UUID strings
  launches?: UUID[];
}

/**
 * Generic API response wrapper (adjust to your actual wrapper)
 */
export interface ApiResponse<T = any> {
  status: boolean;
  data: T;
  message?: string;
  // add other fields your API returns (errors, meta, etc.)
}

/**
 * Example of typed paginated response if your API returns pagination metadata
 * (adapt names to the exact API response shape you get).
 */
export interface PaginatedLaunchpadResponse extends LaunchesPagination {
  docs: Launchpad[];
}
