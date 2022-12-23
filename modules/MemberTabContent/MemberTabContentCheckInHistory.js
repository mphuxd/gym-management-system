import React from "react";
import { Stack, TabsContent, TabContentRow, TabContentRowItem } from "@/components";

export default function MemberTabContentCheckInHistory({ member, ...props }) {
  if (member) {
    const memberCheckInHistory = Array.from(member.checkIns).reverse();
    return (
      <TabsContent {...props}>
        <Stack>
          <TabContentRow>
            <TabContentRowItem
              label='Check-ins'
              space='full'
              value={
                <Stack>
                  {memberCheckInHistory.map((checkIn, idx) => {
                    return (
                      idx <= 9 && (
                        <span key={idx}>{new Date(checkIn.checkInDate).toLocaleString()}</span>
                      )
                    );
                  })}
                </Stack>
              }
            />
          </TabContentRow>
        </Stack>
      </TabsContent>
    );
  } else {
    return (
      <TabsContent {...props}>
        <Stack>
          <TabContentRow>
            <TabContentRowItem
              label='Check-ins'
              space='full'
              value={<div className='flex flex-col'>No results found.</div>}
            />
          </TabContentRow>
        </Stack>
      </TabsContent>
    );
  }
}

// @@@ Add pagination & refactor into table
