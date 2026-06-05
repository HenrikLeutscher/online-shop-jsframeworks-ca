import type { Product } from "../types/product";

{
  /* Discount percentage finder displaying discount %%%% */
}
export default function DiscountProduct({ product }: { product: Product }) {
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  if (!hasDiscount) return null;

  return (
    <span className="absolute top-3 right-3 rounded-xl bg-sale text-white px-2 py-1 text-sm font-semibold">
      -{discountPercentage}% OFF
    </span>
  );
}
