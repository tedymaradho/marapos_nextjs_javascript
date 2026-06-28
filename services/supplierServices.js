import { db } from "@/lib/db";

export async function getSuppliers(page, limit, search, sort, order, offset) {
  let query = `SELECT * FROM suppliers`;
  let values = [];

  if (search) {
    const keyword = `%${search}%`;
    query += ` WHERE name LIKE ? OR phone Like ? OR address LIKE ?`;
    values.push(keyword, keyword, keyword);
  }

  query += ` ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;

  const [result] = await db.execute(query, values);

  let queryCount = `SELECT COUNT(*) as total FROM suppliers`;
  const [resultCount] = await db.execute(queryCount, values);

  return {
    data: result,
    meta: {
      page,
      limit,
      totalData: result.length,
      totalPages: Math.ceil(Number(resultCount[0].total) / Number(limit)),
    },
  };
}

export async function addSupplier(name, phone, address) {
  await db.execute(
    `INSERT INTO suppliers (name, phone, address) VALUES (?, ?, ?)`,
    [name, phone, address],
  );

  return { success: true };
}

export async function deleteSupplier(id) {
  const [result] = await db.execute(`DELETE FROM suppliers WHERE id=?`, [id]);

  if (result.affectedRows == 0)
    return ({ error: "Not found" }, { status: 400 });

  return { success: true };
}

export async function updateSupplier(name, phone, address, id) {
  const [result] = await db.execute(
    `UPDATE suppliers SET name=?, phone=?, address=? WHERE id=?`,
    [name, phone, address, id],
  );

  if (result.affectedRows == 0)
    return ({ error: "Not found" }, { status: 400 });

  return { success: true };
}
