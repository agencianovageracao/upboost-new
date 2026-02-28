import { StatisticsChartPanel } from '@/components/page/panel/home/StatisticsChartPanel';
import { getAdminStatistics } from '@/functions/statistics';
import { presets } from '@/lib/statisticsPresets';
import { endOfMonth, format, startOfMonth } from 'date-fns';

export default async function AdminStatisticsPage() {
  const {
    formattedPurchaseIntentStatistics,
    formattedPurchaseStatistics,
    formattedViewStatistics,
  } = await getAdminStatistics(presets[4]);

  return (
    <div>
      <nav className='mb-10 flex h-fit min-h-[80px] items-center justify-between border-b border-b-neutral-500 py-2'>
        <div>
          <h1 className='text-xl font-medium'>Estatísticas do sistema!</h1>
          <p className='text-sm text-neutral-300 first-letter:capitalize'>
            Exibindo dados do dia{' '}
            {format(startOfMonth(new Date()), "dd 'de' MMMM")} até{' '}
            {format(endOfMonth(new Date()), "dd 'de' MMMM")}
          </p>
        </div>
      </nav>
      <main>
        <div>
          <StatisticsChartPanel
            title='Visitas com link de parceiro'
            description={`Exibindo valores do mês`}
            propKey='viewCount'
            tooltipLabel='Visitas'
            data={formattedViewStatistics}
          />
        </div>
        <div className='mt-5'>
          <StatisticsChartPanel
            title='Tentativas de compra com link de parceiro'
            description={`Exibindo valores do mês`}
            propKey='purchaseIntentCount'
            tooltipLabel='tentativas de compra'
            data={formattedPurchaseIntentStatistics}
          />
        </div>
        <div className='mt-5'>
          <StatisticsChartPanel
            title='Compras com link de parceiro'
            description={`Exibindo valores do mês`}
            propKey='purchaseCount'
            tooltipLabel='compras'
            data={formattedPurchaseStatistics}
          />
        </div>
      </main>
    </div>
  );
}
