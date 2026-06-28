"use client";

import styles from "@/app/products/page.module.css";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Apakah yakin dihapus");
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) {
      alert(result.error);
      return;
    }

    alert("Berhasil dihapus");
    router.refresh();
  }

  return (
    <button className={styles.buttonFlat} onClick={handleDelete}>
      Delete
    </button>
  );
}
