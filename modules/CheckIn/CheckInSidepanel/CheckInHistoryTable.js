import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  HoverCard,
  Searchbar,
  Stack,
  Table,
  TablePagination,
  TableRowCell,
} from '@/components';

export default function CheckInHistoryTable({ checkInHistory }) {
  const router = useRouter();
  const { register } = useForm();

  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  let history = [];
  let rows = [];

  if (checkInHistory) {
    history = Array.from(checkInHistory.checkins).reverse();
    rows = history.slice(firstRowIndex, firstRowIndex + currentPageSize);
  }

  // @@@ Implement search check-in history
  return (
    <Stack id="action-history">
      {history && (
        <Stack className="mt-6 w-full text-sm">
          <Searchbar
            intent="neutralAlt"
            className="w-full border-none hover:cursor-not-allowed"
            name="searchValue"
            placeholder="Search check-in history"
            {...register('searchValue')}
          />
          <Table
            layer="alt"
            className="mt-4 h-[268px] max-h-[268px]"
            headers={['Member Id', 'Date']}
            rows={rows}
            onClick={(e, row) => {
              router.push(`/members/details/${row.memberId}`);
            }}
            render={(row) => <CheckInHistoryRow row={row} />}
          />
          <div className="pt-3">
            <TablePagination
              intent="default"
              totalItems={history.length}
              pageSize={currentPageSize}
              pageSizes={[5, 10, 15, 25]}
              onChange={(page, pageSize) => {
                if (pageSize !== currentPageSize) setCurrentPageSize(pageSize);
                setFirstRowIndex(pageSize * (page - 1));
              }}
            />
          </div>
        </Stack>
      )}
    </Stack>
  );
}

async function getImage(id) {
  const imageSrcRes = await fetch(`/api/member/image/${id}`, {
    method: 'GET',
  });
  const imageSrcData = await imageSrcRes.json();
  return imageSrcData;
}

function CheckInHistoryRow({ row }) {
  const [image, setImage] = useState('/images/image-placeholder.png');
  const [isLoaded, setIsLoaded] = useState(false);

  function onHover() {
    if (isLoaded) {
      return false;
    }
    getImage(row.memberId).then((src) => {
      if (src.statusCode === 200) {
        setImage(src.imageUrl);
        setIsLoaded(true);
      }
    });
    return false;
  }

  return (
    <>
      <TableRowCell
        className="max-w-[131px] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5"
        onMouseEnter={() => onHover()}
      >
        <HoverCard
          openDelay={250}
          trigger={`${row.member.firstName} ${row.member.lastName}`}
        >
          <Stack direction="row" className="gap-4">
            <Avatar src={image} id={row.memberId} />
            <Stack className="text-sm">
              <span className="font-medium">
                {`${row.member.firstName} ${row.member.lastName}`}
              </span>
              <Stack direction="row" className="items-center gap-x-1">
                <Link
                  className="text-sm"
                  href={`/members/details/${row.memberId}`}
                >
                  View Profile
                </Link>
                <ArrowRightIcon />
              </Stack>
            </Stack>
          </Stack>
        </HoverCard>
      </TableRowCell>
      <TableRowCell className="w-[180px] min-w-[180px] max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap py-0.5 pr-1 text-right">
        {new Date(row.checkInDate).toLocaleString()}
      </TableRowCell>
    </>
  );
}
