"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ name, id }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm(
      `Apakah anda yakin akan menghapus supplier ${name} ?`,
    );

    if (!confirmDelete) return;

    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });

    router.refresh();
  }

  return <button onClick={handleDelete}>Delete</button>;
}
