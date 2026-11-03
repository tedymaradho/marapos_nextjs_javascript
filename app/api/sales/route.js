import { db } from "@/lib/db";

export async function POST(req){
    await db.execute(`INSERT INTO sales (invoice_number, sale_date, grand_total) VALUES (?, ?, ?)`, [])
}