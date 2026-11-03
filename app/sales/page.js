import ProductList from "@/components/sales/ProductList";
import ShoppingCart from "@/components/sales/ShoppingCart";
import { SalesProvider } from "@/context/SalesContext";

export default function SalesPage() {
  return (
    <SalesProvider>
      <ProductList />
      <ShoppingCart />
    </SalesProvider>
  );
}
