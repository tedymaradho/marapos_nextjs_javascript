"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Apakah anda yakin mau menghapus ini ?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });

    if (!res.ok) alert(res.json());

    router.refresh();
  }

  return <button onClick={handleDelete}>Delete</button>;
}
