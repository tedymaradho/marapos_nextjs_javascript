"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput({ limit, sort, order }) {
  const router = useRouter();

  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/suppliers?page=1&limit=${limit}&search=${encodeURIComponent(text)}&sort=${sort}&order=${order}`,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [limit, sort, order, text, router]);

  return (
    <input
      type="text"
      name="search"
      placeholder="Search"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
