"use client";

import { useSales } from "@/context/SalesContext";
import { useEffect, useRef, useState } from "react";

export default function ShoppingCart() {
  const qtyRef = useRef(null);
  const { cart, updateQty, removeFromCart, grandTotal } = useSales();
  const [qty, setQty] = useState(0);
  const [idEdit, setIdEdit] = useState(0);

  useEffect(() => {
    if (idEdit && qtyRef.current) {
      qtyRef.current.focus();
      qtyRef.current.select();
    }
  }, [idEdit]);

  function handleCartSelected(item) {
    setIdEdit(item.id);
    setQty(item.qty);
  }

  function handleKeyDown(e, id) {
    switch (e.key) {
      case "Enter":
        const qty = Number(e.target.value);
        if (!Number.isInteger(qty) || qty < 1) {
          alert(`Invalid Quantity`);
          setIdEdit(0);
          break;
        }
        updateQty(id, qty);
        setIdEdit(0);
        break;
      case "Escape":
        setIdEdit(0);
        break;
      case "Delete":
        removeFromCart(id);
        break;
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <td>ID.</td>
          <td>Name</td>
          <td>Price</td>
          <td>Qty</td>
          <td>Subtotal</td>
        </tr>
      </thead>

      <tbody>
        {cart.map((item) => (
          <tr key={item.id} onClick={() => handleCartSelected(item)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price.toLocaleString("id-ID")}</td>
            <td style={{ textAlign: "right" }}>
              {idEdit === item.id ? (
                <input
                  ref={qtyRef}
                  type="text"
                  name="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                />
              ) : (
                item.qty
              )}
            </td>
            <td style={{ textAlign: "right" }}>
              {Number(item.price * item.qty).toLocaleString("id-ID")}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={5}>
            <h2>Grand Total Rp. {grandTotal.toLocaleString("id-ID")}</h2>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
