import Link from "next/link";
import type { ProductsResponse, Product } from "./types/product";
import AddToCartButton from "./components/AddToCartButton";
import DiscountProduct from "./components/DiscountProduct";
import SearchBar from "./components/SearchBar";
import StarsRating from "./components/StarsRating";
import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json: ProductsResponse = await response.json();

  const products = json.data;

  if (!products || products.length === 0) {
    return <p>No products were found</p>;
  }
  //console.log(products)

  return (
    <main className="flex flex-col justify-center items-center py-2">
      <SearchBar products={products} />
      <div className="py-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            href={`/${product.id}`}
            className="productCard"
          >
            <div className="relative">
              <DiscountProduct product={product} />
            </div>
            <Image
              src={product.image.url}
              alt={product.image.alt}
              width={400}
              height={300}
              className="w-full h-50 object-cover rounded-t-2xl"
            />
            <h2 className="font-bold">{product.title}</h2>
            {product.discountedPrice < product.price ? (
              <div className="mt-4">
                <p className="text-text-muted line-through">
                  <strong>{product.price} kr</strong>
                </p>
                <p className="text-lg text-sale font-bold">
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
            {product.rating > 0 ? (
              <StarsRating rating={product.rating} />
            ) : (
              <p className="text-text-muted">No Rating(s)</p>
            )}
            <div className="mt-auto">
              <AddToCartButton product={product} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
