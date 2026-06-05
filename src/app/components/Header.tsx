"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import CartPersist from "./CartPersist";
import { useCartStore } from "../stores/cartStore";
import NexoraLogo from "../../assets/img/Nexora2.png";

// Dropdown component for mobile view
function DropDown() {
  const [open, isOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const items = useCartStore((i) => i.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

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
    <div
      ref={dropdownRef}
      className="relative md:hidden flex justify-end w-full"
    >
      <button onClick={() => isOpen(!open)} className="p-2 rounded">
        {count > 0 && (
          <span className="fixed top-2 right-2 bg-white text-brand rounded-full px-2">
            {count}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 50 50"
        >
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-20 z-10 w-full bg-brand border border-border rounded-md shadow-lg">
          <Link href="/" className="block px-4 py-2 navText">
            Home
          </Link>
          <Link href="/cart" className="block px-4 py-2 navText">
            Cart{" "}
            {count > 0 && (
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-brand">
                {count}
              </span>
            )}
          </Link>
          <Link href="/contact" className="block px-4 py-2 navText">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const items = useCartStore((i) => i.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex flex-row bg-brand md:text-center py-4 items-center px-5 text-white justify-between">
      <Link href="/">
        <h1 className="sr-only">Nexora</h1>
        <Image src={NexoraLogo} alt="Nexora" width={100} height={50} />
      </Link>
      <nav className="hidden md:flex gap-5 justify-center pb-2">
        <Link href="/" className="navText">
          Home
        </Link>
        <Link href="/cart" className="navText">
          Cart{" "}
          {count > 0 && (
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-brand">
              {count}
            </span>
          )}
        </Link>
        <Link href="/contact" className="navText">
          Contact
        </Link>
      </nav>
      <DropDown />
      <CartPersist />
    </header>
  );
}
