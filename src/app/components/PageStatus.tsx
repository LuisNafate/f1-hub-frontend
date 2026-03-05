interface Props {
  loading?: boolean;
  error?: string | null;
  loadingText?: string;
}

export default function PageStatus({ loading, error, loadingText = 'Cargando…' }: Props) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8" style={{ color: 'var(--color-muted)' }}>
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2"
          style={{ borderColor: 'var(--color-muted)', borderTopColor: 'transparent' }}
        />
        <span>{loadingText}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border px-5 py-4 text-sm"
        style={{
          borderColor: '#7f1d1d',
          backgroundColor: 'rgba(127,29,29,0.15)',
          color: '#fca5a5',
        }}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return null;
}
