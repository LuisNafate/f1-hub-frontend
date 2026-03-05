'use client';

import { useEffect, useState } from 'react';
import { fetchCalendar } from '../api/f1';
import type { MeetingRow } from '../types/f1';

interface UseF1CalendarResult {
  data: MeetingRow[] | null;
  loading: boolean;
  error: string | null;
}

export function useF1Calendar(year?: number): UseF1CalendarResult {
  const [data, setData] = useState<MeetingRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCalendar(year)
      .then((rows) => { if (!cancelled) setData(rows); })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Error al cargar el calendario.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [year]);

  return { data, loading, error };
}
