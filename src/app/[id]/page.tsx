/* eslint-disable @next/next/no-img-element */
import type { ProductResponse } from "../types/product";
import AddToCartButton from "../components/AddToCartButton";
import StarsRating from "../components/StarsRating";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);

  if (!response.ok) throw new Error("Failed to fetch product");

  const json: ProductResponse = await response.json();
  const product = json.data;

  return (
    <main className="mx-auto min-h-screen text-text">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 rounded-2xl border border-border bg-surface p-6 shadow-sm md:grid-cols-2 md:p-8">
          <div className="overflow-x-hidden rounded-2xl border border-border bg-surface h-110">
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="h-full object-cover w-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text">{product.title}</h1>

            {product.discountedPrice < product.price ? (
              <div className="mt-4">
                <p className="text-text-muted line-through">
                  <strong>{product.price} kr</strong>
                </p>
                <p className="text-2xl font-bold text-sale">
                  <strong>{product.discountedPrice} kr</strong>
                </p>
              </div>
            ) : (
              <p className="mt-4 text-2xl font-bold text-text">
                {product.price} kr
              </p>
            )}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-text">
                Product Description:
              </h2>
              <p className="mt-2 text-text-muted">{product.description}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text">Product Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <StarsRating rating={product.rating} />
            </div>
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
        <div>
          {product.reviews && product.reviews.length > 0 && (
            <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-xl font-bold text-text">Customer reviews</h3>
              <ul className="mt-4 grid gap-4">
                {product.reviews.map((reviews) => (
                  <li
                    key={reviews.id}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="font-semibold text-text">
                      {reviews.username}
                    </p>
                    <p className="mt-1 text-text-muted">
                      {reviews.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
