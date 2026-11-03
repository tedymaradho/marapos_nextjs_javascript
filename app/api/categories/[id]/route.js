import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categoryServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await deleteCategory(id);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name } = await req.json();

    if (typeof name !== "string" || name.trim() === "")
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });

    const result = await updateCategory(id, name);

    if (result.affectedRows == 0)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, info: result.info });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = await params;

  const result = await getCategoryById(id);

  return NextResponse.json(result);
}
