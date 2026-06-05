"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../stores/cartStore";
import ContinueShopping from "../components/ContinueShopping";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-text">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-text">Checkout Successful!</h1>
        <p className="mt-4 text-text-muted">Thank you for your purchase!</p>
        <p className="mt-4 text-text-muted">
          Your order has been received and is being processed.
        </p>
        <p className="mt-4 text-text-muted">
          You will receive a confirmation email shortly.
        </p>
        <Link href="/" className="mt-4 inline-block">
          <ContinueShopping />
        </Link>
      </div>
    </main>
  );
}
