import React, { useState } from "react";
import { Button } from "@/components";

function TablePagination({ totalItems, pageSize, pageSizes, onChange, backText, nextText }) {
  const [page, setPage] = useState(1);
  let firstIndex = pageSize * (page - 1);

  function handlePageForward(e) {
    if (page >= totalItems / pageSize) return;
    let newPage = page + 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  }

  function handlePageBack(e) {
    if (page === 1) return;
    let newPage = page - 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  }

  return (
    <div className='mt-2 py-2 flex flex-row justify-between font-light px-2 text-sm '>
      <div>{totalItems + " Results"}</div>
      <span className=''>
        {firstIndex} - {firstIndex + pageSize}
      </span>
      <div className='flex flex-row gap-x-2'>
        <button onClick={() => handlePageBack()}>
          <Button as='div' size='small' variant='default'>
            {backText}
          </Button>
        </button>
        <button onClick={() => handlePageForward()}>
          <Button as='div' size='small' variant='default'>
            {nextText}
          </Button>
        </button>
      </div>
    </div>
  );
}

//TO-DO: Add support for variable page size

export default TablePagination;
