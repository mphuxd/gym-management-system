import React, { useState } from 'react';
import { Button } from '@/components';

function TablePagination({
  totalItems,
  pageSize,
  // pageSizes,
  onChange,
  backText,
  nextText,
}) {
  const [page, setPage] = useState(1);
  const firstIndex = pageSize * (page - 1);

  function handlePageForward() {
    if (page >= totalItems / pageSize) return;
    const newPage = page + 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  }

  function handlePageBack() {
    if (page === 1) return;
    const newPage = page - 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  }

  return (
    <div className="mt-2 py-2 flex flex-row justify-between font-light px-2 text-sm ">
      <div>{`${totalItems} Results`}</div>
      <span>
        {firstIndex} - {firstIndex + pageSize}
      </span>
      <div className="flex flex-row gap-x-2">
        <button type="button" onClick={() => handlePageBack()}>
          <Button as="div" size="small" variant="default">
            {backText}
          </Button>
        </button>
        <button type="button" onClick={() => handlePageForward()}>
          <Button as="div" size="small" variant="default">
            {nextText}
          </Button>
        </button>
      </div>
    </div>
  );
}

// TO-DO: Add support for variable page size

export default TablePagination;
