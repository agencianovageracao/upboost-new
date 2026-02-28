'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FormattedStatisticsType } from '../../../../../panel/(partner)/page';
import { presets } from '@/lib/statisticsPresets';

export const ViewsChart = ({
  formattedViewStatistics,
  selectedDate,
}: {
  formattedViewStatistics: FormattedStatisticsType[];
  selectedDate: string;
}) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b border-b-theme-700 p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>
            Acessos com seu link{' '}
            {presets
              .find((preset) => preset.id === selectedDate)
              ?.label.toLowerCase()}
          </CardTitle>
          <CardDescription>Mostrando valores do período</CardDescription>
        </div>
        <div className='flex'></div>
      </CardHeader>
      <CardContent className='flex items-center justify-center px-2 sm:p-6'>
        {formattedViewStatistics.length > 0 ? (
          <>
            <ChartContainer
              config={{
                viewCount: {
                  label: 'Acessos com seu link',
                },
              }}
              className='aspect-auto h-[250px] w-full'
            >
              <BarChart accessibilityLayer data={formattedViewStatistics}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='intervalStart'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={10}
                />
                <YAxis dataKey='viewCount' tickLine={false} axisLine={false} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className='w-[180px] text-white'
                      nameKey='viewCount'
                    />
                  }
                />
                <Bar dataKey='viewCount' fill={`#FFD300`} />
              </BarChart>
            </ChartContainer>
          </>
        ) : (
          <p className='text-neutral-300'>
            Sem registros para o período selecionado
          </p>
        )}
      </CardContent>
    </Card>
  );
};
