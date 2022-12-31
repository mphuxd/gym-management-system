import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "@carbon/icons-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
} from "@/components";

export default function CheckInSidepanel({ checkInHistory }) {
  return (
    <Sidepanel>
      <Accordion className='w-full' type='single' defaultValue='analytics' collapsible>
        <AccordionItem className='w-full' header='Analytics' value='analytics'>
          <CheckInDailyCount checkInHistory={checkInHistory} />
          <CheckInXYChart checkInHistory={checkInHistory} />
          <Link
            href='/analytics'
            className='flex flex-row items-center gap-x-1 w-fit text-sm hover:underline mt-2'
          >
            <span>View More Analytics</span>
            <ArrowRight size={12} />
          </Link>
        </AccordionItem>
      </Accordion>
      <Separator className='my-4' />
      <CheckInHistory className='h-1/2' checkInHistory={checkInHistory} />
    </Sidepanel>
  );
}

function getDailyCheckInCount(checkInHistory) {
  let count = 0;
  for (let i = 0; i < checkInHistory.history.length; i++) {
    const currDate = new Date().toLocaleDateString();
    const itemDate = new Date(checkInHistory.history[i].checkInDate).toLocaleDateString();
    if (currDate === itemDate) {
      count++;
    }
  }
  return count;
}

function CheckInDailyCount({ checkInHistory }) {
  const checkInCount = checkInHistory ? getDailyCheckInCount(checkInHistory) : "-";
  return (
    <Stack>
      <span className='text-6xl'>{checkInCount}</span>
      <span>Check-Ins</span>
    </Stack>
  );
}

function processRecentHistory(history) {
  function convertTimeScale24To12(hour) {
    while (hour < 0) hour = hour + 24;
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = ((hour + 11) % 12) + 1;
    const time = hour + suffix;
    return time;
  }
  const WINDOW = 6;
  let buckets = [];
  for (let i = WINDOW; i >= 0; i--) {
    let hour = new Date().getHours() - i;
    const time = convertTimeScale24To12(hour);
    buckets.push({ hour: time, count: 0 });
  }
  if (history) {
    const historyWindow = history.history.filter((item) => {
      const itemTime = new Date(item.checkInDate).getTime();
      const xHoursAgo = new Date().setHours(new Date().getHours() - WINDOW);
      if (itemTime >= xHoursAgo) {
        return item;
      }
    });
    historyWindow.forEach((history) => {
      for (let i = 0; i < buckets.length; i++) {
        let eventHour = new Date(history.checkInDate).getHours();
        const eventTime = convertTimeScale24To12(eventHour);
        if (buckets[i].hour === eventTime) {
          buckets[i].count++;
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
  const { register, handleSubmit, resetField } = useForm();

  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  let history = [];
  let rows = [];

  if (checkInHistory) {
    history = Array.from(checkInHistory.history).reverse();
    rows = history.slice(firstRowIndex, firstRowIndex + currentPageSize);
  }

  // @@@ Implement search check-in history
  return (
    <Stack id='action-history' className='gap-y-4'>
      <h3 className=''>Check In History</h3>
      <Stack direction='row' className='items-center w-full'>
        <Searchbar
          disabled
          className='w-full border-none hover:cursor-not-allowed'
          name='searchValue'
          placeholder='Search history'
          {...register("searchValue")}
        />
      </Stack>

      {/* @@@ Make ScrollArea, Scrollbar, Thumb, Corner generic */}
      <ScrollArea.Root className='overflow-hidden'>
        {history && (
          <ScrollArea.Viewport className='w-full'>
            <Stack className='w-full text-sm'>
              <Table
                headers={["Member Id", "Date"]}
                rows={rows}
                onClick={(e, row) => {
                  router.push(`/members/details/${row.memberId}`);
                }}
                render={(row) => {
                  return <CheckInHistoryRow row={row} />;
                }}
              />
              <TablePagination
                totalItems={history.length}
                backText='Previous'
                nextText='Next'
                pageSize={currentPageSize}
                pageSizes={[5, 10, 15, 25]}
                onChange={(page, pageSize) => {
                  if (pageSize !== currentPageSize) setCurrentPageSize(pageSize);
                  setFirstRowIndex(pageSize * (page - 1));
                }}
              />
            </Stack>
          </ScrollArea.Viewport>
        )}
        <ScrollArea.Scrollbar
          className='flex select-none touch-none w-2 bg-gray-200 opacity-50'
          orientation='vertical'
        >
          <ScrollArea.Thumb data-state='' className='flex-1 relative bg-black' />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </Stack>
  );
}

async function getImage(id) {
  const imageSrcRes = await fetch(`/api/member/getS3Image/${id}`);
  const imageSrcData = await imageSrcRes.json();
  return imageSrcData;
}

function CheckInHistoryRow({ row }) {
  const [image, setImage] = useState("/images/image-placeholder.png");
  const [isLoaded, setIsLoaded] = useState(false);

  function onHover() {
    if (isLoaded) {
      return;
    } else {
      getImage(row.memberId).then((src) => {
        if (src.statusCode === 200) {
          setImage(src.imageUrl);
          setIsLoaded(true);
        }
      });
    }
  }

  return (
    <React.Fragment>
      <TableRowCell onMouseEnter={() => onHover()}>
        <HoverCard openDelay={250} trigger={row.member.userId}>
          <Stack direction='row' className='gap-4'>
            <Avatar src={image} id={row.memberId} />
            <Stack className='text-sm'>
              <span className='font-medium'>
                {row.member.firstName + " " + row.member.lastName}
              </span>
              <Stack direction='row' className='items-center gap-x-1'>
                <Link className='text-sm' href={`/members/details/${row.memberId}`}>
                  View Profile
                </Link>
                <ArrowRightIcon />
              </Stack>
            </Stack>
          </Stack>
        </HoverCard>
      </TableRowCell>
      <TableRowCell className=''>{new Date(row.checkInDate).toLocaleString()}</TableRowCell>
    </React.Fragment>
  );
}
