"use client";

import { useRouter } from "next/navigation";

export default function ShowSelect({ page, search, sort, order, totalData }) {
  const router = useRouter();

  function handleShow(e) {
    let pageAfter = page;

    if (Number(e.target.value) < Number(totalData)) {
      pageAfter = Math.ceil(Number(totalData) / Number(e.target.value));
    } else if (Number(e.target.value) >= Number(totalData)) {
      pageAfter = 1;
    }

    router.push(
      `/suppliers?page=${pageAfter}&limit=${e.target.value}&search=${search}&sort=${sort}&order=${order}`,
    );
  }

  return (
    <select name="show" onChange={handleShow}>
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>
  );
}
