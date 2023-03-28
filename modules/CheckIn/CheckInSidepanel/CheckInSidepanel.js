import React from 'react';
import {
  Accordion,
  AccordionItem,
  Separator,
  Sidepanel,
  Stack,
} from '@/components';
import CheckInDailyCount from './CheckInDailyCount';
import CheckInXYChart from './CheckInXYChart';
import CheckInHistoryTable from './CheckInHistoryTable';

export default function CheckInSidepanel({ checkInHistory }) {
  return (
    <Sidepanel>
      <Accordion
        className="w-full"
        type="multiple"
        defaultValue={['analytics', 'history']}
        collapsible="true"
      >
        <AccordionItem className="w-full" header="Analytics" value="analytics">
          <Stack className="mt-6">
            <CheckInDailyCount checkInHistory={checkInHistory} />
            <CheckInXYChart checkInHistory={checkInHistory} />
          </Stack>
        </AccordionItem>

        <Separator className="my-4 bg-border-subtle-darker" />
        <AccordionItem
          className="w-full"
          header="Check-in History"
          value="history"
        >
          <CheckInHistoryTable
            className="h-1/2"
            checkInHistory={checkInHistory}
          />
        </AccordionItem>
      </Accordion>
      <Separator className="my-4 bg-border-subtle-darker" />
    </Sidepanel>
  );
}
