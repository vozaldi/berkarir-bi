'use client';

import clsx from "clsx";
import { useUiShallow } from "@/states/uiState";
import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { RadarChart } from "echarts/charts";
import { LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { EChartsOption } from "echarts/types/dist/shared";

echarts.use([
  RadarChart,
  TooltipComponent,
  SVGRenderer,
  TitleComponent,
  LegendComponent,
  // TooltipComponent,
]);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  statistic?: {};
};

function PolarRoleStatistic({
  className,
  statistic,
  ...props
}: Props) {
  // Hooks
  const theme = useUiShallow((state) => state.theme);

  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // Effects
  useEffect(() => {
    if (chartDivRef.current) {
      chartRef.current = echarts.init(chartDivRef.current, 'light');
    }

    return () => chartRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (statistic && chartRef.current) {
      chartRef.current.setOption<EChartsOption>({
        title: { show: false },
        legend: { show: false },
        radar: {
          center: ['50%', '55%'],
          indicator: [
            { name: `Pengetahuan Umum`, min: 0, max: 100 },
            { name: `Politis`, min: 0, max: 100 },
            { name: `Sejarawan`, min: 0, max: 100 },
            { name: `Fisikawan`, min: 0, max: 100 },
            { name: `Biologist`, min: 0, max: 100 },
          ].map((item) => ({ ...item, name: item.name.replace(' ', '\n') })),
          splitLine: {
            lineStyle: {
              color: 'var(--app-dark-300)',
              width: 1,
              type: 'solid',
            },
          },
          axisLine: {
            lineStyle: {
              color: 'var(--app-dark-500)',
            },
          },
          axisNameGap: -4,
          axisName: {
            backgroundColor: 'var(--app-dark-200)',
            color: 'var(--app-dark-700)',
            borderRadius: 4,
            padding: [2, 4],
            position: 'top',
          },
        },
        series: [{
          name: `Statistik`,
          type: 'radar',
          data: [{
            value: [80, 55, 78, 90, 55],
            name: `Performa Ksatria`,
          }],
        }],
      });
    }
  }, [statistic]);

  return (
    <div className={clsx(['relative flex flex-col', className])} {...props}>
      <h3 className="text-base font-bold text-center">{`Performa Ksatria`}</h3>

      <div
        ref={chartDivRef}
        className="mt-2 flex-1"
      />
    </div>
  );
};

export default PolarRoleStatistic;
