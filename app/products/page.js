import styles from "@/app/products/page.module.css";
import Link from "next/link";
import AddProductForm from "../../components/products/AddProductForm";
import DeleteButton from "../../components/products/DeleteButton";
import InputSearch from "../../components/products/InputSearch";
import ShowDropdown from "../../components/products/ShowDropdown";

export default async function ProductsPage({ searchParams }) {
  const {
    page = 1,
    id,
    search,
    sort = "id",
    order = "asc",
    limit = 10,
  } = await searchParams;

  const res = await fetch(
    process.env.BASE_URL +
      `/api/products?page=${page}&search=${search}&sort=${sort}&order=${order}&limit=${limit}`,
    { cache: "no-store" }
  );

  const { data, meta } = await res.json();

  const resCategories = await fetch(process.env.BASE_URL + `/api/categories`);
  const categories = await resCategories.json();

  const resSuppliers = await fetch(process.env.BASE_URL + `/api/suppliers`);
  const suppliers = await resSuppliers.json();

  function getNextSort(column) {
    if (sort !== column) {
      return {
        sort: column,
        order: "asc",
      };
    }

    if (order === "asc") {
      return {
        sort: column,
        order: "desc",
      };
    }

    return {
      sort: "",
      order: "",
    };
  }

  const nextNameSort = getNextSort("name");
  const nextPriceSort = getNextSort("price");
  const nextStockSort = getNextSort("stock");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className={styles.title}>Products</h1>
        <div style={{ display: "flex", gap: 20 }}>
          <ShowDropdown
            page={page}
            search={search}
            sort={sort}
            order={order}
            limit={limit}
          />
          <div style={{ position: "relative" }}>
            <InputSearch sort={sort} order={order} limit={limit} />
            <span
              style={{ position: "absolute", right: 5, top: 6, fontSize: 20 }}
            >
              &#128269;
            </span>
          </div>
        </div>
      </div>
      <table className={styles.tableDefault}>
        <thead>
          <tr>
            <th className={styles.cellTable} style={{ width: "1%" }}>
              No.
            </th>
            <th className={styles.cellTable}>
              <Link
                href={`/products?page=${page}&search=${search}&sort=${nextNameSort.sort}&order=${nextNameSort.order}&limit=${limit}`}
                className={styles.buttonFlat}
              >
                Name &nbsp;
                {sort === "name" && order === "asc" && (
                  <span style={{ color: "grey" }}>&#9650;</span>
                )}
                {sort === "name" && order === "desc" && (
                  <span style={{ color: "grey" }}>&#9660;</span>
                )}
              </Link>
            </th>
            <th className={styles.cellTable}>
              <Link
                href={`/products?page=${page}&search=${search}&sort=${nextPriceSort.sort}&order=${nextPriceSort.order}&limit=${limit}`}
                className={styles.buttonFlat}
              >
                Price &nbsp;
                {sort === "price" && order === "asc" && (
                  <span style={{ color: "grey" }}>&#9650;</span>
                )}
                {sort === "price" && order === "desc" && (
                  <span style={{ color: "grey" }}>&#9660;</span>
                )}
              </Link>
            </th>
            <th className={styles.cellTable}>
              <Link
                href={`/products?page=${page}&search=${search}&sort=${nextStockSort.sort}&order=${nextStockSort.order}&limit=${limit}`}
                className={styles.buttonFlat}
              >
                Stock &nbsp;
                {sort === "stock" && order === "asc" && (
                  <span style={{ color: "grey" }}>&#9650;</span>
                )}
                {sort === "stock" && order === "desc" && (
                  <span style={{ color: "grey" }}>&#9660;</span>
                )}
              </Link>
            </th>
            <th>Category Name</th>
            <th>Supplier Name</th>
            <th className={styles.cellTable} style={{ width: 106 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {id && (
            <AddProductForm
              id={id}
              page={page}
              search={search}
              sort={sort}
              order={order}
              limit={limit}
              categories={categories}
              suppliers={suppliers}
            />
          )}

          {data.map((item, index) => (
            <tr key={item.id}>
              <td className={styles.cellTable}>
                {index + 1 + (page - 1) * meta.limit}
              </td>
              <td className={styles.cellTable}>{item.name}</td>
              <td className={styles.cellTable} style={{ textAlign: "right" }}>
                {Number(item.price).toLocaleString("id-ID")}
              </td>
              <td className={styles.cellTable} style={{ textAlign: "right" }}>
                {Number(item.stock).toLocaleString("id-ID")}
              </td>
              <td className={styles.cellTable}>{item.category_name}</td>
              <td className={styles.cellTable}>{item.supplier_name}</td>
              <td className={styles.cellTable}>
                <Link
                  href={`/products?page=${meta.page}&id=${item.id}&search=${search}&sort=${sort}&order=${order}&limit=${limit}`}
                  className={styles.buttonFlat}
                >
                  Edit
                </Link>
                &nbsp; | &nbsp;
                <DeleteButton id={item.id} />
              </td>
            </tr>
          ))}

          {page == meta.totalPages && !id && (
            <AddProductForm
              id={id}
              page={page}
              search={search}
              sort={sort}
              order={order}
              limit={limit}
              categories={categories}
              suppliers={suppliers}
            />
          )}
        </tbody>
      </table>

      <p style={{ marginTop: 10 }}>{`${(meta.page - 1) * meta.limit + 1}-${
        meta.limit * page > meta.total ? meta.total : meta.limit * page
      } of ${meta.total} data`}</p>

      <ul
        style={{
          display: "flex",
          gap: 10,
          listStyle: "none",
          marginTop: 30,
        }}
      >
        {Array.from({ length: meta.totalPages }).map((_, index) => (
          <li key={index}>
            <Link
              href={`/products?page=${
                index + 1
              }&search=${search}&sort=${sort}&order=${order}&limit=${limit}`}
              className={styles.cellTable}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
