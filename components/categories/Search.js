"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({ page, show, sort, order }) {
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/categories?page=${page}&show=${show}&sort=${sort}&order=${order}&search=${text}`,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [text, router, page, show, sort, order]);

  return (
    <input
      type="text"
      name="search"
      placeholder="Search"
      onChange={(e) => setText(e.target.value)}
    />
  );
}
