import {
  getAdminStatistics,
  getStatisticsByDateRange,
} from '@/functions/statistics';
import { format } from 'date-fns';
import { StatisticsChartPanel } from '@/components/page/panel/home/StatisticsChartPanel';
import { presets } from '@/lib/statisticsPresets';

export type FormattedStatisticsType = {
  intervalStart: string;
  viewCount: number;
  purchaseCount: number;
};

export default async function RootAdminPanelPage() {
  const {
    formattedViewStatistics,
    formattedPurchaseIntentStatistics,
    formattedPurchaseStatistics,
  } = await getAdminStatistics(presets[0]);

  return (
    <>
      <nav className='mb-10 flex h-fit min-h-[80px] items-start border-b border-b-neutral-500 py-2'>
        <div>
          <h1 className='text-xl font-medium'>Olá!</h1>
          <p className='text-sm text-neutral-300 first-letter:capitalize'>
            Exibindo dados de todos os parceiros
          </p>
        </div>
      </nav>
      <div className='mt-10 flex items-center gap-5'>
        <StatisticsChartPanel
          title='Visitas com link de parceiros hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='viewCount'
          tooltipLabel='Visitas'
          data={formattedViewStatistics}
        />
        <StatisticsChartPanel
          title='Tentativas de compra link de parceiros hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='purchaseIntentCount'
          tooltipLabel='tentativas de compra'
          data={formattedPurchaseIntentStatistics}
        />
      </div>
      <div className='mt-5'>
        <StatisticsChartPanel
          title='Compras com link de parceiros hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='purchaseCount'
          tooltipLabel='compras'
          data={formattedPurchaseStatistics}
        />
      </div>
    </>
  );
}
