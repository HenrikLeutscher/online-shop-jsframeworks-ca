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
        onClick={(event) => {
          event?.preventDefault();
          event.stopPropagation();
          addItem(product);
          showMessage("Product Added to cart");
        }}
        className="ctaButton"
      >
        Add to Cart
      </button>

      {message && (
        <div className="mt-2 text-sm text-white bg-green-500 px-2 py-1 rounded">
          {message}
        </div>
      )}
    </div>
  );
}
