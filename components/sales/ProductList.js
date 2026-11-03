"use client";

import { useSales } from "@/context/SalesContext";
import { useEffect } from "react";

export default function ProductList() {
  const { products, setProducts, addToCart } = useSales();

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`/api/products`, {
        cache: "no-store",
      });

      const { data } = await res.json();

      setProducts(data);
    }

    loadProducts();
  }, [setProducts]);

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <button onClick={() => addToCart(item)}>
            {item.name} {item.price.toLocaleString()}
          </button>
        </li>
      ))}
    </ul>
  );
}
