import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import {
  getLastStatistics,
  getStatisticsByDateRange,
} from '@/functions/statistics';
import { format } from 'date-fns';
import { recentStatisticsColumns } from './columns';
import { StatisticsChartPanel } from '@/components/page/panel/home/StatisticsChartPanel';
import { presets } from '@/lib/statisticsPresets';

export type FormattedStatisticsType = {
  intervalStart: string;
  viewCount: number;
  purchaseCount: number;
};

export default async function RootPanelPage() {
  const {
    formattedViewStatistics,
    formattedPurchaseIntentStatistics,
    formattedPurchaseStatistics,
  } = await getStatisticsByDateRange(presets[0]);
  const lastStatistics = await getLastStatistics();

  return (
    <>
      <div className='flex items-center gap-5'>
        <StatisticsChartPanel
          title='Visitas com seu link hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='viewCount'
          tooltipLabel='Visitas'
          data={formattedViewStatistics}
        />
        <StatisticsChartPanel
          title='Tentativas de compra com seu link hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='purchaseIntentCount'
          tooltipLabel='tentativas de compra'
          data={formattedPurchaseIntentStatistics}
        />
      </div>
      <div className='mt-5'>
        <StatisticsChartPanel
          title='Compras com seu link hoje'
          description={`Mostrando valores do dia ${format(new Date(), 'dd/MM/yyyy')}`}
          propKey='purchaseCount'
          tooltipLabel='compras'
          data={formattedPurchaseStatistics}
        />
      </div>
      <Card className='mt-5'>
        <CardHeader>
          <CardTitle>Últimos eventos registrados</CardTitle>
          <CardDescription>
            Exibindo os últimos 10 eventos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={recentStatisticsColumns} data={lastStatistics} />
        </CardContent>
      </Card>
    </>
  );
}
