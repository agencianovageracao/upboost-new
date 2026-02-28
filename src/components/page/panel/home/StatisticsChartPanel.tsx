'use client';

import type { FormattedStatisticsType } from '../../../../../panel/(partner)/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export const StatisticsChartPanel = ({
  data,
  title,
  propKey,
  tooltipLabel,
  description,
}: {
  data: FormattedStatisticsType[];
  title: string;
  propKey: string;
  tooltipLabel: string;
  description?: string;
}) => {
  const chartConfig = {
    [propKey]: {
      label: tooltipLabel,
    },
  } satisfies ChartConfig;

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b border-b-theme-700 p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>{title}</CardTitle>
          {!!description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className='flex'></div>
      </CardHeader>
      <CardContent className='flex items-center justify-center px-2 sm:p-6'>
        {data.length > 0 ? (
          <>
            <ChartContainer
              config={chartConfig}
              className='aspect-auto h-[250px] w-full'
            >
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='intervalStart'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <YAxis dataKey={propKey} tickLine={false} axisLine={false} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className='w-[180px] text-white'
                      nameKey={propKey}
                    />
                  }
                />
                <Bar dataKey={propKey} fill={`#FFD300`} />
              </BarChart>
            </ChartContainer>
          </>
        ) : (
          <p className='text-neutral-300'>Sem registros para o dia de hoje</p>
        )}
      </CardContent>
    </Card>
  );
};
