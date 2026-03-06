import type { ProductResponse } from "../types/product";
import AddToCartButton from "../components/AddToCartButton";

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
    <main className="p-4 max-w-3xl mx-auto md:flex md:gap-6">
      <div className="mt-4">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-1/2 h-100 object-cover md:w-full"
        />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        {product.discountedPrice < product.price ? (
          <div className="mt-4">
            <p className="text-lg line-through italic">
              <strong>{product.price} kr</strong>
            </p>
            <p className="text-lg">
              <strong>{product.discountedPrice} kr</strong>
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-lg">
              <strong>{product.price} kr</strong>
            </p>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Product Description:</h2>
          <p>{product.description}</p>
        </div>
        <div className="py-5">
          <h3 className="text-lg font-bold">Product Tags</h3>
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <AddToCartButton product={product} />
        {product.reviews && product.reviews.length > 0 && (
          <div>
            <h3>Customer reviews:</h3>
            <ul>
              {product.reviews.map((reviews) => (
                <li key={reviews.id} className="bg-blue-500 rounded-xl p-4">
                  <p className="font-bold">{reviews.username}</p>
                  <p>{reviews.rating} stars</p>
                  <p>{reviews.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
