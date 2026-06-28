import { addSupplier, getSuppliers } from "@/services/supplierServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "id";
    const order = searchParams.get("order") || "asc";

    const offset = (page - 1) * limit;

    const result = await getSuppliers(page, limit, search, sort, order, offset);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, phone, address } = await req.json();

    if (!name || typeof name !== "string")
      return NextResponse.json(
        { error: `Invalid name ${typeof name}` },
        { status: 400 },
      );

    if (!phone || name.length < 6)
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });

    if (!address || typeof address !== "string")
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });

    const result = await addSupplier(name, phone, address);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
