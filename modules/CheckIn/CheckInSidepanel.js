import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ArrowRight } from '@carbon/icons-react';
import {
  Accordion,
  AccordionItem,
  Avatar,
  HoverCard,
  Searchbar,
  Separator,
  Sidepanel,
  Stack,
  Table,
  TablePagination,
  TableRowCell,
  XYChartWrapper,
} from '@/components';

export default function CheckInSidepanel({ checkInHistory }) {
  return (
    <Sidepanel>
      <Accordion
        className="w-full"
        type="single"
        defaultValue="analytics"
        collapsible
      >
        <AccordionItem className="w-full" header="Analytics" value="analytics">
          <Stack className="mt-8">
            <CheckInDailyCount checkInHistory={checkInHistory} />
            <CheckInXYChart checkInHistory={checkInHistory} />
            <Link
              href="/analytics"
              className="flex flex-row items-center gap-x-1 w-fit text-sm hover:underline mt-4"
            >
              <span>View More Analytics</span>
              <ArrowRight size={12} />
            </Link>
          </Stack>
        </AccordionItem>
      </Accordion>
      <Separator className="my-4 bg-border-strong" />
      <CheckInHistory className="h-1/2" checkInHistory={checkInHistory} />
    </Sidepanel>
  );
}

function getDailyCheckInCount(checkInHistory) {
  let count = 0;
  for (let i = 0; i < checkInHistory.checkins.length; i += 1) {
    const currDate = new Date().toLocaleDateString();
    const itemDate = new Date(
      checkInHistory.checkins[i].checkInDate
    ).toLocaleDateString();
    if (currDate === itemDate) {
      count += 1;
    }
  }
  return count;
}

function CheckInDailyCount({ checkInHistory }) {
  const checkInCount = checkInHistory
    ? getDailyCheckInCount(checkInHistory)
    : '-';
  return (
    <Stack>
      <span className="text-6xl">{checkInCount}</span>
      <span>Check-Ins</span>
    </Stack>
  );
}

function processRecentHistory(history) {
  function convertTimeScale24To12(hour) {
    let newHour = hour;
    while (newHour < 0) newHour += 24;
    const suffix = newHour >= 12 ? 'PM' : 'AM';
    const newScaleHour = ((newHour + 11) % 12) + 1;
    const time = newScaleHour + suffix;
    return time;
  }
  const WINDOW = 6;
  const buckets = [];

  for (let i = WINDOW; i >= 0; i -= 1) {
    const hour = new Date().getHours() - i;
    const time = convertTimeScale24To12(hour);
    buckets.push({ hour: time, count: 0 });
  }

  if (history) {
    const historyWindow = history.checkins.filter((item) => {
      const itemTime = new Date(item.checkInDate).getTime();
      const xHoursAgo = new Date().setHours(new Date().getHours() - WINDOW);
      if (itemTime >= xHoursAgo) {
        return item;
      }
      return false;
    });

    historyWindow.forEach((historyItem) => {
      for (let i = 0; i < buckets.length; i += 1) {
        const eventHour = new Date(historyItem.checkInDate).getHours();
        const eventTime = convertTimeScale24To12(eventHour);
        if (buckets[i].hour === eventTime) {
          buckets[i].count += 1;
          break;
        }
      }
    });
  }
  return buckets;
}

function CheckInXYChart({ checkInHistory }) {
  const chartData = processRecentHistory(checkInHistory);
  return (
    <XYChartWrapper
      accessors={{
        xAccessor: (d) => d.hour,
        yAccessor: (d) => d.count,
      }}
      data={chartData}
    />
  );
}

function CheckInHistory({ checkInHistory }) {
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
    <Stack id="action-history" className="gap-y-8">
      <h3>Check In History</h3>
      {history && (
        <Stack className="w-full text-sm">
          <Searchbar
            disabled
            className="w-full border-none hover:cursor-not-allowed"
            name="searchValue"
            placeholder="Search history table"
            {...register('searchValue')}
          />
          <Table
            className="h-[268px] max-h-[268px]  "
            headers={['Member Id', 'Date']}
            rows={rows}
            onClick={(e, row) => {
              router.push(`/members/details/${row.memberId}`);
            }}
            render={(row) => <CheckInHistoryRow row={row} />}
          />
          <TablePagination
            totalItems={history.length}
            pageSize={currentPageSize}
            pageSizes={[5, 10, 15, 25]}
            onChange={(page, pageSize) => {
              if (pageSize !== currentPageSize) setCurrentPageSize(pageSize);
              setFirstRowIndex(pageSize * (page - 1));
            }}
          />
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
        className="px-1 max-w-[131px] overflow-hidden text-ellipsis whitespace-nowrap"
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
      <TableRowCell className="w-[180px] min-w-[180px] max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
        {new Date(row.checkInDate).toLocaleString()}
      </TableRowCell>
    </>
  );
}
