"use client";

import { useRouter } from "next/navigation";

export default function SortButton({
  children,
  page,
  search,
  sort = "id",
  order = "asc",
}) {
  const router = useRouter();

  function handleSort() {
    let orderNext = "asc";

    if (sort == "id" && order == "asc") {
      orderNext = "asc";
    } else if (sort == children.toLocaleLowerCase() && order == "asc") {
      orderNext = "desc";
    } else {
      orderNext = "asc";
    }

    router.push(
      `/suppliers?page=${page}&search=${search}&sort=${children.toLocaleLowerCase()}&order=${orderNext}`,
    );
  }

  return (
    <button type="button" onClick={handleSort}>
      {children}
    </button>
  );
}
