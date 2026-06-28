"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddSupplierForm({
  name,
  phone,
  address,
  id,
  page,
  limit,
  search,
  sort,
  order,
}) {
  const [form, setForm] = useState({
    name: name || "",
    phone: phone || "",
    address: address || "",
  });

  const router = useRouter();

  async function handleAdd() {
    if (id) {
      const res = await fetch(`/api/suppliers/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (!res.ok) return;
      router.push(
        `/suppliers?page${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`,
      );
    } else {
      const res = await fetch(`/api/suppliers`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!res.ok) return;
      router.refresh();
    }

    setForm({ name: "", phone: "", address: "" });
  }

  function handleCancel() {
    setForm({ name: "", phone: "", address: "" });

    router.push(
      `/suppliers?page${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`,
    );
  }

  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Input name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          name="phone"
          placeholder="Input phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          placeholder="Input address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </td>
      <td>
        <button onClick={handleAdd}>{id ? "Update" : "Add"}</button>
        {id && (
          <>
            {" | "}
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </td>
    </tr>
  );
}
