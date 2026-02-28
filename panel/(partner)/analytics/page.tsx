import { StatisticsChartPanel } from '@/components/page/panel/home/StatisticsChartPanel';
import { PanelStatisticsNavbar } from '@/components/page/panel/statistics/PanelStatisticsNavbar';
import { getStatisticsByDateRange } from '@/functions/statistics';
import { presets, searchParamsCache } from '@/lib/statisticsPresets';
import { format } from 'date-fns';

export default async function AnalyticsPanelPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { date: selectedDate } = searchParamsCache.parse(searchParams);

  const {
    formattedViewStatistics,
    formattedPurchaseStatistics,
    formattedPurchaseIntentStatistics,
  } = await getStatisticsByDateRange(
    presets.find((preset) => preset.id === selectedDate) || presets[0]
  );

  return (
    <>
      <PanelStatisticsNavbar selectedDate={selectedDate} presets={presets} />
      <main>
        <div className='flex items-center gap-5'>
          <StatisticsChartPanel
            title='Acessos com seu link'
            description={`Mostrando valores entre ${format(presets.find((preset) => preset.id === selectedDate)?.startDate || new Date(), 'dd/MM HH:mm')} - ${format(presets.find((preset) => preset.id === selectedDate)?.endDate || new Date(), 'dd/MM HH:mm')}`}
            propKey='viewCount'
            tooltipLabel='Acessos'
            data={formattedViewStatistics}
          />
          <StatisticsChartPanel
            title='Tentativas de compra com seu link'
            description={`Mostrando valores entre ${format(presets.find((preset) => preset.id === selectedDate)?.startDate || new Date(), 'dd/MM HH:mm')} - ${format(presets.find((preset) => preset.id === selectedDate)?.endDate || new Date(), 'dd/MM HH:mm')}`}
            propKey='purchaseIntentCount'
            tooltipLabel='Tentativas de compra'
            data={formattedPurchaseIntentStatistics}
          />
        </div>
        <div className='mt-5'>
          <StatisticsChartPanel
            title='Compras com seu link'
            description={`Mostrando valores entre ${format(presets.find((preset) => preset.id === selectedDate)?.startDate || new Date(), 'dd/MM HH:mm')} - ${format(presets.find((preset) => preset.id === selectedDate)?.endDate || new Date(), 'dd/MM HH:mm')}`}
            propKey='purchaseCount'
            tooltipLabel='Compras'
            data={formattedPurchaseStatistics}
          />
        </div>
      </main>
    </>
  );
}
