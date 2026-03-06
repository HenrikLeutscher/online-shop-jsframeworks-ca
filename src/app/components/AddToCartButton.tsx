"use client";

import { useState } from "react";
import type { Product } from "../types/product";
import { useCartStore } from "../stores/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [message, setMessage] = useState("");

  function showMessage(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 1500);
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => {
          addItem(product);
          showMessage("Product Added to cart");
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>

      {message && (
        <div className="mt-2 text-sm text-white bg-green-500 px-2 py-1 rounded w-1/3">
          {message}
        </div>
      )}
    </div>
  );
}
