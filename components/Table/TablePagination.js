import React, { useState } from 'react';
import cx from 'classnames';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import Button from '../Button';

function TablePagination({
  totalItems,
  pageSize,
  onChange,
  backText,
  nextText,
  size = 'base',
  intent = 'default',
}) {
  const [page, setPage] = useState(1);
  const firstIndex = pageSize * (page - 1);
  const lastIndex =
    totalItems < firstIndex + pageSize ? totalItems : firstIndex + pageSize;
  const numRows = lastIndex - firstIndex;

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
    'flex flex-row justify-between font-light pl-2 text-sm border-border-subtle-dark',
    {
      'border-t': pageSize !== numRows,
      'bg-white': intent === 'default',
      'bg-layer-alt': intent === 'alt',
    }
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
        <Button as="div" className="pagination border-x py-2" intent="neutral">
          {backText}
        </Button>
      ) : (
        <div className="border-x border-border-strong-dark py-2 px-4 outline-0 hover:bg-layer-hover active:bg-layer-active">
          <CaretLeftIcon className="text-icon-dark" />
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
        >
          {nextText}
        </Button>
      ) : (
        <div className="border-border-strong-dark py-2 px-4 outline-0 hover:bg-layer-hover active:bg-layer-active">
          <CaretRightIcon className="text-icon-dark" />
        </div>
      )}
    </button>
  );
}
