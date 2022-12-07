import React from "react";
import * as Label from "@radix-ui/react-label";

function CheckInHistory({ history }) {
  const historyArray = Array.from(history).reverse();

  return (
    <div id='checkin-history' className='flex flex-col '>
      <Label.Root className='text-sm mb-1 font-medium text-gray-500'>Check In History</Label.Root>

      {historyArray.length !== 0 ? (
        historyArray.map((checkIn, idx) => {
          if (idx < 10)
            return (
              <div key={idx} className='flex flex-row justify-between'>
                <span>{new Date(checkIn.checkInDate).toLocaleString()}</span>
              </div>
            );
        })
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
}

export default CheckInHistory;

// @@@ Add pagination & refactor into table 
