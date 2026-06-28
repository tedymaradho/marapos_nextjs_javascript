"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ page, limit, search, sort, order, id }) {
  const router = useRouter();

  function handleEdit() {
    router.push(
      `/suppliers?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}&id=${id}`,
    );
  }

  return <button onClick={handleEdit}>Edit</button>;
}
