import React from 'react';
import { XYChartWrapper } from '@/components';

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

export default function CheckInXYChart({ checkInHistory }) {
  const chartData = processRecentHistory(checkInHistory);
  return (
    <div className="mt-1">
      <XYChartWrapper
        accessors={{
          xAccessor: (d) => d.hour,
          yAccessor: (d) => d.count,
        }}
        data={chartData}
      />
    </div>
  );
}
