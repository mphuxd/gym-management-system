import React from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/useSWRFetcher';
import {
  Stack,
  Table,
  TableRowCell,
  TabsContent,
  TabContentRow,
  TabContentRowItem,
} from '@/components';

function getRows(invoices) {
  return invoices.data.map((invoice) => ({
    amount: invoice.amount_due,
    id: invoice.number,
    status: invoice.status,
    description: invoice.description,
    date: new Date(invoice.created * 1000).toLocaleString(),
  }));
}

export default function MemberTabContentPaymentHistory({ member, ...props }) {
  const { data } = useSWR(
    member
      ? `/api/member/getStripeInvoices/${member.membership.customerId}`
      : null,
    fetcher
  );

  if (data && data.invoices.data.length > 0) {
    const { invoices } = data;
    const rows = getRows(invoices).slice(0, 10);
    return (
      <TabsContent {...props}>
        <Stack>
          <Table
            headers={['Amount', 'Invoice ID', 'Status', 'Description', 'Date']}
            rows={rows}
            onClick={() => {}}
            render={(row) => (
              <>
                <TableRowCell className="w-[1px] whitespace-nowrap py-1 px-2">
                  <div>{`$${(row.amount / 100).toFixed(2)}`}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap py-1 px-2">
                  <div>{row.id}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap py-1 px-2">
                  <div>{row.status}</div>
                </TableRowCell>
                <TableRowCell className="py-1 px-2">
                  <div>{row.description}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap py-1 px-2">
                  <div>{row.date}</div>
                </TableRowCell>
              </>
            )}
          />
          <span className="text-sm text-gray11 p-2">
            {`Displaying ${rows.length + 1} of ${
              invoices.data.length + 1
            } payments.`}
          </span>
        </Stack>
      </TabsContent>
    );
  }
  return (
    <TabsContent {...props}>
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

// @@@ Add pagination & refactor into table
