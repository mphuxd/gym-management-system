import React from 'react';
import {
  Stack,
  Table,
  TableRowCell,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
} from '@/components';

function getRows(checkInHistory) {
  return checkInHistory.map((checkIn) => ({
    id: checkIn.id,
    event: 'Check In',
    status: 'OK',
    date: new Date(checkIn.checkInDate).toLocaleString(),
  }));
}
// @@@ Update values after check-in refactor

export default function MemberTabContentCheckInHistory({
  member,
  value,
  ...props
}) {
  if (member && member?.checkIns.length > 0) {
    const memberCheckInHistory = Array.from(member.checkIns).reverse();
    const rows = getRows(memberCheckInHistory).slice(0, 10);
    return (
      <TabsContent value={value} {...props}>
        <Stack>
          <Table
            layer="alt"
            className="w-full"
            headers={['Event', 'Status', 'Date']}
            rows={rows}
            cursor="auto"
            onClick={() => {}}
            render={(row) => (
              <>
                <TableRowCell className="hidden w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.id}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.event}</div>
                </TableRowCell>
                <TableRowCell className=" px-2 py-1">
                  {/* @@@ Add Icon to status */}
                  <div>{row.status}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.date}</div>
                </TableRowCell>
              </>
            )}
          />
          <span className="p-2 text-sm text-gray11">
            {`Displaying ${rows.length} of ${memberCheckInHistory.length} check-ins.`}
          </span>
        </Stack>
      </TabsContent>
    );
  }
  return (
    <TabsContent value={value} {...props}>
      <Stack>
        <TabContentRow>
          <TabContentRowItem
            label="Check-ins"
            space="full"
            value={<div className="flex flex-col">No results found.</div>}
          />
        </TabContentRow>
      </Stack>
    </TabsContent>
  );
}

// @@@ Add pagination
