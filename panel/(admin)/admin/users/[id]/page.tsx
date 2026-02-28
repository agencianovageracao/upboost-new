import { StatisticsChartPanel } from '@/components/page/panel/home/StatisticsChartPanel';
import { PanelStatisticsNavbar } from '@/components/page/panel/statistics/PanelStatisticsNavbar';
import { getStatisticsByDateRangeByAdmin } from '@/functions/statistics';
import { listUserIds } from '@/functions/user';
import { presets, searchParamsCache } from '@/lib/statisticsPresets';
import { format } from 'date-fns';

export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const { users }: any = await listUserIds();
  return users;
}

export default async function UserStatisticPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { date: selectedDate } = searchParamsCache.parse(searchParams);

  const {
    formattedViewStatistics,
    formattedPurchaseStatistics,
    formattedPurchaseIntentStatistics,
  } = await getStatisticsByDateRangeByAdmin(
    presets.find((preset) => preset.id === selectedDate) || presets[0],
    params.id
  );

  return (
    <>
      <PanelStatisticsNavbar
        selectedDate={selectedDate}
        presets={presets}
        fromAdmin={true}
      />
      <main>
        <div className='flex items-center gap-5'>
          <StatisticsChartPanel
            title='Acessos com o link do parceiro'
            description={`Mostrando valores entre ${format(presets.find((preset) => preset.id === selectedDate)?.startDate || new Date(), 'dd/MM HH:mm')} - ${format(presets.find((preset) => preset.id === selectedDate)?.endDate || new Date(), 'dd/MM HH:mm')}`}
            propKey='viewCount'
            tooltipLabel='Acessos'
            data={formattedViewStatistics}
          />
          <StatisticsChartPanel
            title='Tentativas de compra com o link do parceiro'
            description={`Mostrando valores entre ${format(presets.find((preset) => preset.id === selectedDate)?.startDate || new Date(), 'dd/MM HH:mm')} - ${format(presets.find((preset) => preset.id === selectedDate)?.endDate || new Date(), 'dd/MM HH:mm')}`}
            propKey='purchaseIntentCount'
            tooltipLabel='Tentativas de compra'
            data={formattedPurchaseIntentStatistics}
          />
        </div>
        <div className='mt-5'>
          <StatisticsChartPanel
            title='Compras com o link do parceiro'
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
