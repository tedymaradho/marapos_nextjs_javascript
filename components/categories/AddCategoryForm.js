"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddCategoryForm({ id }) {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    async function loadFormEdit() {
      const res = await fetch(`/api/categories/${id}`);

      const { data } = await res.json();

      setName(data[0].name);
    }

    if (id) loadFormEdit();
  }, [id]);

  async function handleAdd() {
    if (id) {
      await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      });

      router.push(`/categories?page=1`);
    } else {
      await fetch(`http://localhost:3000/api/categories`, {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      router.refresh();
    }

    setName("");
  }

  return (
    <div style={{ display: "flex", padding: 0 }}>
      <input
        type="text"
        name="name"
        style={{ width: "99%", height: 39, marginLeft: 1 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleAdd}>{id ? "Update" : "Add"}</button>
    </div>
  );
}
