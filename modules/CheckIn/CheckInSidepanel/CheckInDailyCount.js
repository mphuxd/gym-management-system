import React from 'react';
import { Stack } from '@/components';

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

export default function CheckInDailyCount({ checkInHistory }) {
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
