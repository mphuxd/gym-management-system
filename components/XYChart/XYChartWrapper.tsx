import React from 'react';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';

export default function XYChartWrapper({ data, accessors }) {
  return (
    <XYChart
      height={160}
      width={310}
      margin={{ top: 24, right: 24, bottom: 32, left: 0 }}
      xScale={{ type: 'band' }}
      yScale={{ type: 'linear' }}
    >
      <AnimatedAxis numTicks={6} orientation="right" />
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={6} />
      <AnimatedLineSeries
        className="stroke-primary"
        dataKey="Check Ins"
        data={data}
        {...accessors}
      />
      <Tooltip
        glyphStyle={{ fill: 'rgb(80, 80, 80)' }}
        snapTooltipToDatumX
        snapTooltipToDatumY
        showSeriesGlyphs
        renderTooltip={({ tooltipData }) => (
          <div>
            <div>{tooltipData.nearestDatum.key}</div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {', '}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
}
