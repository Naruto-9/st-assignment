import { useState } from "react";

export const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  return { currentData, page, setPage, maxPage };
};
