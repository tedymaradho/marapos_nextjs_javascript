import AddCategoryForm from "@/components/categories/AddCategoryForm";
import DeleteButton from "@/components/categories/DeleteButton";
import Search from "@/components/categories/Search";
import Show from "@/components/categories/Show";
import Link from "next/link";

export default async function CategoriesPage({ searchParams }) {
  const {
    page = 1,
    id = "",
    search = "",
    show = 10,
    sort = "id",
    order = "asc",
  } = await searchParams;

  const res = await fetch(
    process.env.BASE_URL + `/api/categories?page=${page}&id=${id}&search=${search}&show=${show}&sort=${sort}&order=${order}`,
    {
      cache: "no-store",
    }
  );
  const { data, meta } = await res.json();

  function getNextOrder(orderby) {
    if (orderby == "id") return { sort: "name", order: "asc" };

    if (orderby == "name" && order == "asc")
      return { sort: "name", order: "desc" };

    return { sort: "id", order: "asc" };
  }

  const nextOrderName = getNextOrder("name");

  return (
    <div>
      <div>
        <h1>Categories</h1>
        <div>
          <Search page={page} show={show} sort={sort} order={order} /> &nbsp;
          Show
          <Show page={page} search={search} sort={sort} order={order} />
        </div>
      </div>
      <table
        style={{ borderCollapse: "collapse", marginBottom: 30, marginTop: 10 }}
      >
        <thead>
          <tr>
            <th style={{ padding: 10, border: "1px solid #000" }}>ID</th>
            <th style={{ padding: 10, border: "1px solid #000" }}>
              <Link
                href={`/categories?page=${page}&search=${search}&show=${show}&sort=${nextOrderName.sort}&order=${nextOrderName.order}`}
              >
                Name
              </Link>
            </th>
            <th style={{ padding: 10, border: "1px solid #000" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: 10, border: "1px solid #000" }}>
                {item.id}
              </td>
              <td
                style={{ padding: 10, border: "1px solid #000" }}
                colSpan={id == item.id ? 2 : 0}
              >
                {id == item.id ? <AddCategoryForm id={id} /> : item.name}
              </td>
              {!(id == item.id) && (
                <td style={{ padding: 10, border: "1px solid #000" }}>
                  <Link
                    href={`/categories?page=${page}&id=${item.id}&show=${show}&sort=${sort}&order=${order}`}
                  >
                    Edit
                  </Link>{" "}
                  | <DeleteButton id={item.id} />
                </td>
              )}
            </tr>
          ))}

          {!id && (
            <tr>
              <td style={{ padding: 10, border: "1px solid #000" }}></td>
              <td style={{ border: "1px solid #000" }} colSpan={2}>
                <AddCategoryForm />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {Array.from({ length: meta.totalPages }).map((item, index) => (
        <Link
          href={`/categories?page=${
            index + 1
          }&show=${show}&search=${search}&sort=${sort}&order=${order}`}
          key={index}
          style={{ border: "1px solid #000", padding: 10 }}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
}
