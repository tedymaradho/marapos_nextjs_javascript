import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/services/productServices";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = await params;
  const result = await getProductById(id);

  if (result.length === 0)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });

  return NextResponse.json({ data: result[0], length: result.length });
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, price, stock, categoryId, supplierId } = await req.json();

    if (typeof name !== "string" || name.trim() === "")
      return NextResponse.json({ error: "invalid name" }, { status: 400 });

    if (typeof price !== "number" || price < 0)
      return NextResponse.json({ error: "invalid price" }, { status: 400 });

    if (typeof stock !== "number" || stock < 0)
      return NextResponse.json({ error: "invalid stock" }, { status: 400 });

    const result = await updateProduct(
      name,
      price,
      stock,
      categoryId,
      supplierId,
      id
    );

    if (result.affectedRows == 0)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ success: true, info: result.info });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const { id } = await params;

    const result = await deleteProduct(id);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
