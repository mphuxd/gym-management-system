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
    amount: `$${(invoice.amount_due / 100).toFixed(2)}`,
    id: invoice.number,
    status: invoice.status,
    description: invoice.description,
    date: new Date(invoice.created * 1000).toLocaleString(),
  }));
}

export default function MemberTabContentPaymentHistory({
  member,
  value,
  ...props
}) {
  const { data } = useSWR(
    member
      ? `/api/member/getStripeInvoices/${member.membership.customerId}`
      : null,
    fetcher
  );

  if (data && data?.invoices.data.length > 0) {
    const rows = getRows(data.invoices).slice(0, 10);
    return (
      <TabsContent value={value} {...props}>
        <Stack>
          <Table
            layer="alt"
            headers={['Amount', 'Invoice ID', 'Status', 'Description', 'Date']}
            rows={rows}
            cursor="auto"
            onClick={() => {}}
            render={(row) => (
              <>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.amount}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.id}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.status}</div>
                </TableRowCell>
                <TableRowCell className="px-2 py-1">
                  <div>{row.description}</div>
                </TableRowCell>
                <TableRowCell className="w-[1px] whitespace-nowrap px-2 py-1">
                  <div>{row.date}</div>
                </TableRowCell>
              </>
            )}
          />
          <span className="p-2 text-sm text-support">
            {`Displaying ${rows.length} of ${data.invoices.data.length} payments.`}
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
            label="Payments"
            space="full"
            value={<div className="flex flex-col">No results found.</div>}
          />
        </TabContentRow>
      </Stack>
    </TabsContent>
  );
}

// @@@ Add pagination
