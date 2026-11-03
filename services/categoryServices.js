import { db } from "@/lib/db";

export async function getCategories(page, limit, search, sort, order, offset) {
  let query = `SELECT * FROM categories`;
  let values = [];

  if (search) {
    query += ` WHERE name like ?`;
    values.push(`%${search}%`);
  }

  query += ` ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;

  const [results] = await db.execute(query, values);

  let queryCount = `SELECT COUNT(*) as total FROM categories`;

  const [countResults] = await db.execute(queryCount, values);

  return {
    data: results,
    meta: {
      page,
      limit,
      totalData: countResults[0].total,
      totalPages: Math.ceil(Number(countResults[0].total) / limit),
    },
  };
}

export async function addCategory(name) {
  db.execute(`INSERT INTO categories (name) VALUES (?)`, [name]);

  return { success: true };
}

export async function deleteCategory(id) {
  const [result] = await db.execute(`DELETE FROM categories WHERE id=?`, [id]);

  if (result.affectedRows == 0) return { error: "Not found" }, { status: 404 };

  return { success: true };
}

export async function updateCategory(id, name) {
  const [result] = await db.execute(`UPDATE categories SET name=? WHERE id=?`, [
    name,
    id,
  ]);

  return result;
}

export async function getCategoryById(id) {
  const [result] = await db.execute(`SELECT * FROM categories WHERE id=?`, [
    id,
  ]);

  return { data: result };
}
