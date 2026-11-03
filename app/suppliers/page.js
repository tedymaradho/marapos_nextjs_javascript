import DeleteButton from "@/components/suppliers/DeleteButton";
import AddSupplierForm from "@/components/suppliers/AddSupplierForm";
import EditButton from "@/components/suppliers/EditButton";
import SearchInput from "@/components/suppliers/SearchInput";
import ShowSelect from "@/components/suppliers/ShowSelect";
import Link from "next/link";
import SortButton from "@/components/suppliers/SortButton";

export default async function SuppliersPage({ searchParams }) {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "id",
    order = "asc",
    id = "",
  } = await searchParams;

  const res = await fetch(
    process.env.BASE_URL +
      `/api/suppliers?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`
  );
  const { data, meta } = await res.json();

  return (
    <div>
      <div>
        <h1>Suppliers</h1>
        <div>
          <SearchInput limit={limit} sort={sort} order={order} />
          &ensp; Show
          <ShowSelect
            page={page}
            search={search}
            sort={sort}
            order={order}
            totalData={meta.totalData}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>
              <SortButton page={page} search={search} sort={sort} order={order}>
                Name
              </SortButton>
            </th>
            <th>
              <SortButton page={page} search={search} sort={sort} order={order}>
                Phone
              </SortButton>
            </th>
            <th>
              <SortButton page={page} search={search} sort={sort} order={order}>
                Address
              </SortButton>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <AddSupplierForm />
          {data.map((item, index) =>
            id == item.id ? (
              <AddSupplierForm
                key={item.id}
                name={item.name}
                phone={item.phone}
                address={item.address}
                id={item.id}
                page={page}
                limit={limit}
                search={search}
                sort={sort}
                order={order}
              />
            ) : (
              <tr key={item.id}>
                <td>{index + 1 + (page - 1) * limit}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <EditButton
                    page={page}
                    limit={limit}
                    search={search}
                    sort={sort}
                    order={order}
                    id={item.id}
                  />{" "}
                  | <DeleteButton name={item.name} id={item.id} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div>
        {Array.from({ length: meta.totalPages }).map((item, index) => (
          <Link
            href={`/suppliers?page=${
              index + 1
            }&limit=${limit}&search=${search}&sort=${sort}&order=${order}`}
            key={index}
            style={{ marginRight: "10px" }}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
