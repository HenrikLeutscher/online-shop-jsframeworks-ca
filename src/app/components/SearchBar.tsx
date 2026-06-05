"use client";

import { useState } from "react";
import Link from "next/link";
import type { SearchBarProps } from "../types/searchbar";
import Image from "next/image";

export default function SearchBar({ products }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col w-full items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="border border-primary p-2 w-1/2 rounded mx-auto"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm.trim() !== "" && (
        <div className="absolute left-0 right-0 top-42 mt-2 bg-background border border-primary rounded shadow z-20 w-full max-h-120 overflow-y-auto  md:max-w-1/2 mx-auto">
          <p className="text-black italic opacity-50">
            Showing{" "}
            <span className="font-bold underline">
              {filteredProducts.length}
            </span>{" "}
            results from your search:{" "}
            <span className="font-bold underline">{searchTerm}</span>
          </p>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${product.id}`}
                className="block px-4 py-2 hover:bg-blue-700 text-black hover:text-white"
                onClick={() => setSearchTerm("")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover"
                    />
                    {product.title}
                  </div>
                  <div>
                    <p>{product.price} kr</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">No products found</p>
          )}
        </div>
      )}
    </div>
  );
}
