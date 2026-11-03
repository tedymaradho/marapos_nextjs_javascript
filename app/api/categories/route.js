import { addCategory, getCategories } from "@/services/categoryServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("show") || 10);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "asc";

  const offset = (page - 1) * limit;

  const result = await getCategories(page, limit, search, sort, order, offset);

  return NextResponse.json(result);
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name && typeof name !== "String")
      return NextResponse.json({ error: "Inavalid name" }, { status: 400 });

    const result = await addCategory(name);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
