import { db } from "@/lib/db";

export async function getProductById(id) {
  const [result] = await db.execute(`SELECT * FROM products WHERE id=?`, [id]);

  return result;
}

export async function updateProduct(
  name,
  price,
  stock,
  categoryId,
  supplierId,
  id,
) {
  const [result] = await db.execute(
    `UPDATE products SET name=?, price=?, stock=?, category_id=?, supplier_id=? WHERE id=?`,
    [name, price, stock, categoryId, supplierId, id],
  );

  return result;
}

export async function deleteProduct(id) {
  const [result] = await db.execute(`DELETE FROM products WHERE id=?`, [id]);
  return result;
}

export async function getProducts(page, limit, search, sort, order) {
  const offset = (page - 1) * limit;

  let query = `SELECT p.*, c.name as category_name, s.name as supplier_name 
              FROM products p LEFT JOIN categories c ON p.category_id=c.id 
              LEFT JOIN suppliers s ON p.supplier_id=s.id`;
  let values = [];

  if (search) {
    query += ` WHERE p.name like ?`;
    values.push(`%${search}%`);
  }

  const allowedSort = {
    name: "name",
    price: "price",
    stock: "stock",
  };

  let orderBy = "p.id asc";

  if (allowedSort[sort] && ["asc", "desc"].includes(order)) {
    orderBy = `${allowedSort[sort]} ${order.toUpperCase()}`;
  }

  query += ` ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;

  const [rows] = await db.execute(query, values);

  let queryCount = `SELECT COUNT(*) as total FROM products`;

  if (search) {
    queryCount += ` WHERE name like ?`;
  }

  const [rowsCount] = await db.execute(queryCount, values);

  return {
    data: rows,
    meta: {
      query,
      limit,
      page,
      total: Number(rowsCount[0].total),
      totalPages: Math.ceil(Number(rowsCount[0].total) / limit),
    },
  };
}

export async function addProduct(name, price, stock, categoryId, supplierId) {
  const [result] = await db.execute(
    `INSERT INTO products (name, price, stock, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)`,
    [name, price, stock, categoryId, supplierId],
  );

  return result;
}
