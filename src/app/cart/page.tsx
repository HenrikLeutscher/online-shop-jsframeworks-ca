/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useCartStore } from "../stores/cartStore";
import ContinueShopping from "../components/ContinueShopping";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-text">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="mt-4 text-text-muted">Your cart is currently empty.</p>
          <Link href="/" className="mt-4 inline-block">
            <ContinueShopping />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-3xl mx-auto min-h-screen bg-background px-4 py-10 text-text">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <ul className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <li
              key={item.productId}
              className="border-b py-2 flex gap-4 items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    src={item.image.url}
                    alt={item.image.alt}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text">
                    {item.title}
                  </h2>
                  <p className="text-text-muted">
                    {item.price} kr x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  className="rounded border border-border px-3 py-1 text-text hover:bg-background"
                >
                  -
                </button>

                <span className="font-bold text-2xl">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="rounded border border-border px-3 py-1 text-text hover:bg-background"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="rounded border border-border px-3 py-1 text-text hover:bg-background"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Total: {total.toFixed(2)} kr</p>
          <Link href="/checkout-success" className="ctaButton">
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
