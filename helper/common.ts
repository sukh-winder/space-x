import { Launch } from "./types/launches";

/**
 * Converts a Unix timestamp to DD/MM/YYYY format.
 * @param unixTimestamp number (in seconds)
 * @returns string - formatted date as DD/MM/YYYY
 */
export const formatUnixToDate = (
  unixTimestamp: number | null | undefined
): string => {
  // Multiply by 1000 because JS Date expects milliseconds
  if (!unixTimestamp) return "Invalid date";

  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const dedupeById = (arr: Launch[]) => {
  const map = new Map<string, Launch>();
  for (const it of arr) {
    if (it.id) map.set(String(it.id), it);
  }
  return Array.from(map.values());
};
