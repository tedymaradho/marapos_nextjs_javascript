"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InputSearch({ sort, order, limit }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/products?page=1&search=${encodeURIComponent(search)}&sort=${sort}&order=${order}&limit=${limit}`,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [search, router, order, limit, sort]);

  return (
    <input
      type="text"
      placeholder="Pencarian"
      style={{ width: 200, height: 35, paddingLeft: 5 }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
