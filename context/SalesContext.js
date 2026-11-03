"use client";

const { createContext, useContext, useState, useMemo } = require("react");

const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  function addToCart(item) {
    setCart((cart) => {
      const find = cart.find((c) => c.id === item.id);

      if (find) {
        return cart.map((t) =>
          t.id === find.id ? { ...t, qty: Number(t.qty) + 1 } : t
        );
      } else {
        return [
          ...cart,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            qty: Number(1),
          },
        ];
      }
    });
  }

  function updateQty(id, qty) {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  }

  function removeFromCart(id) {
    const delConfirm = confirm(
      `Anda yakin akan menghapus data dengan id ${id} ?`
    );
    if (delConfirm) {
      setCart((prev) => prev.filter((c) => c.id !== id));
    }
  }

  const grandTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cart]);

  return (
    <SalesContext.Provider
      value={{
        cart,
        setCart,
        products,
        setProducts,
        addToCart,
        updateQty,
        removeFromCart,
        grandTotal,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  return useContext(SalesContext);
}
