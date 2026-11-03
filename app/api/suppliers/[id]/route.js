import { deleteSupplier, updateSupplier } from "@/services/supplierServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await deleteSupplier(id);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, phone, address } = await req.json();

    if (typeof name !== "string" || name.trim() === "")
      return NextResponse.json({ error: `Invalid name` }, { status: 400 });

    const result = await updateSupplier(name, phone, address, id);

    if (result.affectedRows === 0)
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, info: result.info });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
