"use client"

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
  return (
    <main>
        <div className="text-red-500 text-center text-2xl">
          <p>Error fetching products</p>
          <p>{error.message}</p>
        </div>
    </main>
  );
}