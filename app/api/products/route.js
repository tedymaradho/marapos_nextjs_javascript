import { addProduct, getProducts } from "@/services/productServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Math.min(100, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") || "id").toLowerCase();
  const order = (searchParams.get("order") || "asc").toLowerCase();

  const result = await getProducts(page, limit, search, sort, order);

  return NextResponse.json(result);
}

export async function POST(req) {
  try {
    const { name, price, stock, categoryId, supplierId } = await req.json();

    const result = await addProduct(name, price, stock, categoryId, supplierId);

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
