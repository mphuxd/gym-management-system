import React, { useState } from 'react';
import cx from 'classnames';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from '../Button';

export interface TablePaginationProps {
  totalItems: number;
  pageSize: number;
  onChange: (newPage, pageSize) => void;
  backText?: string;
  nextText?: string;
}

function TablePagination({
  totalItems,
  pageSize,
  onChange,
  backText,
  nextText,
}: TablePaginationProps) {
  const [page, setPage] = useState<number>(1);
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
          backText={backText}
          handlePageBack={handlePageBack}
        />
        <TablePaginationNext
          nextText={nextText}
          handlePageForward={handlePageForward}
        />
      </div>
    </div>
  );
}

// @@@ TO-DO: Add support for variable page size

export default TablePagination;

export interface TablePaginationPrevProps {
  backText?: string;
  handlePageBack: () => void;
}

function TablePaginationPrev({
  backText,
  handlePageBack,
}: TablePaginationPrevProps) {
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
        <div className="group border-r border-border-strong-dark px-4 py-2 outline-0 hover:bg-layer-hover hover:shadow-md active:bg-layer-active">
          <CaretLeftIcon className="text-icon-dark group-hover:text-black" />
        </div>
      )}
    </button>
  );
}

export interface TablePaginationNextProps {
  nextText?: string;
  handlePageForward: () => void;
}

function TablePaginationNext({
  nextText,
  handlePageForward,
}: TablePaginationNextProps) {
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
        <div className="group border-border-strong-dark px-4 py-2 outline-0 hover:bg-layer-hover hover:shadow-md active:bg-layer-active">
          <CaretRightIcon className="text-icon-dark group-hover:text-black" />
        </div>
      )}
    </button>
  );
}
