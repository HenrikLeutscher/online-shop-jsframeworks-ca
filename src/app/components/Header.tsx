"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState, useRef, useEffect } from "react";
import CartPersist from "./CartPersist";
import { useCartStore } from "../stores/cartStore";

// Dropdown component for mobile view
function DropDown() {
  const [open, isOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function clickHandler(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        isOpen(false);
      }
    }

    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative md:hidden">
      <button onClick={() => isOpen(!open)} className="p-2 border rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 w-48 bg-blue-500 border border-gray-200 rounded-md shadow-lg">
          <Link href="/" className="block px-4 py-2 hover:bg-blue-800">
            Home
          </Link>
          <Link href="/cart" className="block px-4 py-2 hover:bg-blue-800">
            Cart
          </Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-blue-800">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="flex flex-row md:flex-col bg-blue-500 md:text-center py-4 justify-between items-center px-5">
      <h1 className="font-bold">Online Shop</h1>
      <nav className="hidden md:flex gap-5 justify-center">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/cart" className="hover:underline">
          Cart {useCartStore((i) => i.items.length)}
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
      <SearchBar />
      <DropDown />
      <CartPersist />
    </header>
  );
}
