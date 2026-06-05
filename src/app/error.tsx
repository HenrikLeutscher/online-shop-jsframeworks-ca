"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-center">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text">
          Error Fetching Products
        </h1>

        <p className="mt-2 text-text-muted">{error.message}</p>

        <button
          onClick={() => location.reload()}
          className="mt-6 rounded-lg bg-brand px-4 py-2 text-white transition-opacity hover:opacity-90"
        >
          Refresh Page
        </button>
      </div>
    </main>
  );
}
