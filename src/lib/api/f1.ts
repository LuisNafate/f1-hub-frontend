import type { DriverRow, MeetingRow, TeamView } from '../types/f1';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al llamar a ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchCalendar(year?: number): Promise<MeetingRow[]> {
  const query = year ? `?year=${year}` : '';
  return apiFetch<MeetingRow[]>(`/api/f1/calendar${query}`);
}

export async function fetchDrivers(): Promise<DriverRow[]> {
  return apiFetch<DriverRow[]>('/api/f1/drivers');
}

/** Agrupa pilotos por equipo incluyendo el color del equipo. */
export function groupByTeam(drivers: DriverRow[]): TeamView[] {
  const map = new Map<string, { colour: string; drivers: DriverRow[] }>();
  for (const d of drivers) {
    const existing = map.get(d.teamName);
    if (existing) {
      existing.drivers.push(d);
    } else {
      map.set(d.teamName, { colour: d.teamColour, drivers: [d] });
    }
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([teamName, { colour, drivers }]) => ({ teamName, teamColour: colour, drivers }));
}
