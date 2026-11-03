"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/products/page.module.css";
import { useRouter } from "next/navigation";

export default function AddProductForm({
  id,
  page,
  search,
  sort,
  order,
  limit,
  categories,
  suppliers,
}) {
  const router = useRouter();
  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");

  let payload = {
    name,
    price: Number(price),
    stock: Number(stock),
    categoryId,
    supplierId,
  };

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${id}`);
      const { data } = await res.json();

      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setCategoryId(data.category_id);
      setSupplierId(data.supplier_id);

      if (nameRef !== null) {
        nameRef.current.focus();
      }
    }

    if (id) loadProduct();
  }, [id]);

  async function handleAdd() {
    let res;
    if (id) {
      res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...payload, id }),
      });
    } else {
      res = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
      });
    }

    const result = await res.json();

    if (!res.ok) {
      alert(result.error);
      return;
    }

    id
      ? router.push(
          `/products?page=${page}&search=${search}&sort=${sort}&order=${order}&limit=${limit}`
        )
      : router.refresh();

    setName("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setSupplierId("");
  }

  function handleCancel() {
    router.push(
      `/products?page=${page}&search=${search}&sort=${sort}&order=${order}&limit=${limit}`
    );

    setName("");
    setPrice("");
    setStock("");
  }

  return (
    <>
      <tr>
        <td className={styles.cellTable}></td>
        <td className={styles.cellTable} style={{ padding: 2 }}>
          <input
            type="text"
            name="name"
            className={styles.inputText}
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td className={styles.cellTable} style={{ padding: 2 }}>
          <input
            type="text"
            name="price"
            className={styles.inputText}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </td>
        <td className={styles.cellTable} style={{ padding: 2 }}>
          <input
            type="text"
            name="stock"
            className={styles.inputText}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </td>
        <td className={styles.cellTable} style={{ padding: 2 }}>
          <select
            className={styles.inputText}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Pilih category</option>
            {categories.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </td>
        <td className={styles.cellTable} style={{ padding: 2 }}>
          <select
            className={styles.inputText}
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option>Pilih supplier</option>
            {suppliers.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </td>
        <td className={styles.cellTable}>
          <button onClick={handleAdd} className={styles.buttonFlat}>
            {id ? "Save" : "Add"}
          </button>
          {id && " | "}
          <button onClick={handleCancel} className={styles.buttonFlat}>
            {id && "Cancel"}
          </button>
        </td>
      </tr>
    </>
  );
}
