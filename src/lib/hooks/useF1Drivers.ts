'use client';

import { useEffect, useState } from 'react';
import { fetchDrivers } from '../api/f1';
import type { DriverRow } from '../types/f1';

interface UseF1DriversResult {
  data: DriverRow[] | null;
  loading: boolean;
  error: string | null;
}

export function useF1Drivers(): UseF1DriversResult {
  const [data, setData] = useState<DriverRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchDrivers()
      .then((rows) => {
        if (!cancelled) {
          setData(rows);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar los pilotos.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
