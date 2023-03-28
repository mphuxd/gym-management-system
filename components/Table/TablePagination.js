import React, { useState } from 'react';
import cx from 'classnames';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from '../Button';

function TablePagination({
  totalItems,
  pageSize,
  onChange,
  backText,
  nextText,
  size = 'base',
}) {
  const [page, setPage] = useState(1);
  const firstIndex = pageSize * (page - 1);
  const lastIndex =
    totalItems < firstIndex + pageSize ? totalItems : firstIndex + pageSize;

  const handlePageForward = () => {
    if (page >= totalItems / pageSize) return;
    const newPage = page + 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  };

  const handlePageBack = () => {
    if (page === 1) return;
    const newPage = page - 1;
    setPage(newPage);
    onChange(newPage, pageSize);
  };

  const classNames = cx(
    'flex flex-row justify-between font-light pl-2 text-sm'
  );

  return (
    <div className={classNames}>
      <div className="my-auto">{`${totalItems} Results`}</div>
      <span className="my-auto">
        {firstIndex} - {lastIndex}
      </span>
      <div className="flex flex-row">
        <TablePaginationPrev
          size={size}
          backText={backText}
          handlePageBack={handlePageBack}
        />
        <TablePaginationNext
          size={size}
          nextText={nextText}
          handlePageForward={handlePageForward}
        />
      </div>
    </div>
  );
}

// @@@ TO-DO: Add support for variable page size

export default TablePagination;

function TablePaginationPrev({ backText, handlePageBack }) {
  return (
    <button type="button" onClick={() => handlePageBack()}>
      {backText ? (
        <Button
          as="div"
          className="pagination border-x py-2"
          intent="neutral"
          length="small"
        >
          {backText}
        </Button>
      ) : (
        <div className="group border-r border-border-strong-dark py-2 px-4 outline-0 hover:bg-layer-hover hover:shadow-md active:bg-layer-active">
          <CaretLeftIcon className="text-icon-dark group-hover:text-black" />
        </div>
      )}
    </button>
  );
}

function TablePaginationNext({ nextText, handlePageForward }) {
  return (
    <button type="button" onClick={() => handlePageForward()}>
      {nextText ? (
        <Button
          as="div"
          className="border-border-subtle py-2 outline-0"
          intent="neutral"
          length="small"
        >
          {nextText}
        </Button>
      ) : (
        <div className="group border-border-strong-dark py-2 px-4 outline-0 hover:bg-layer-hover hover:shadow-md active:bg-layer-active">
          <CaretRightIcon className="text-icon-dark group-hover:text-black" />
        </div>
      )}
    </button>
  );
}
