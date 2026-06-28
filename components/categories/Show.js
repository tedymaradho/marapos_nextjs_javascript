"use client";

import { useRouter } from "next/navigation";

export default function Show({ page, search, sort, order }) {
  const router = useRouter();

  return (
    <select
      onChange={(e) =>
        router.push(
          `/categories?page=${page}&search=${search}&sort=${sort}&order=${order}&show=${e.target.value}`,
        )
      }
    >
      <option value={10}>10</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  );
}
