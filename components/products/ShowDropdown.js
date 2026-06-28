"use client";

import { useRouter } from "next/navigation";

export default function ShowDropdown({ page, search, sort, order, limit }) {
  const router = useRouter();

  return (
    <div>
      Show &nbsp;
      <select
        style={{ width: 40, height: 35 }}
        value={limit}
        onChange={(e) => {
          router.push(
            `/products?page=${page}&search=${search}&sort=${sort}&order=${order}&limit=${e.target.value}`,
          );
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
