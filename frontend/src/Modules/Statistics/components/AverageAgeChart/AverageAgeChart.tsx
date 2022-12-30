import React from 'react';
import { subDays } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Heading6 } from 'Shared/Typography';
import { getDarkTheme } from 'Themes';
import { Api } from 'Utils/Api';
import { getISODateStringFromDate } from 'Utils/getISODateStringFromDate';
import { AverageAgeChartData, DateRangeData } from '../../fixtures';
import { formatLegendText, formatTooltipText } from '../../helpers';
import { DateRangeSelect } from '../';
import { StyledChartContainer } from '../Shared.styled';

interface Props {
  projectId: Id;
}

export const AverageAgeChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<AverageAgeChartData[]>([]);
  const theme = useTheme() as ReturnType<typeof getDarkTheme>;

  const handleDateChange = React.useCallback(
    (values: DateRangeData): void => {
      Api.get(`statistics/average_age/${projectId}`, {
        startDate: values.startDate,
        finishDate: values.finishDate
      })
        .then((response) => response.json())
        .then((data) => setChartData(data));
    },
    [projectId]
  );

  React.useEffect(() => {
    if (projectId.length) {
      handleDateChange({
        startDate: getISODateStringFromDate(subDays(new Date(), 7)),
        finishDate: getISODateStringFromDate(new Date())
      });
    }
  }, [projectId, handleDateChange]);

  const tooltipFormatter = React.useCallback(
    (value: string | number, name: string) => formatTooltipText(value, name, t),
    [t]
  );
  const legendFormatter = React.useCallback((value: string) => formatLegendText(value, t), [t]);

  const renderChart = (): JSX.Element => (
    <ResponsiveContainer width="90%" height={600}>
      <BarChart
        data={chartData}
        width={600}
        height={600}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={chartData.length > 15 ? 2 : 1} />
        <YAxis
          label={{ value: t('general.days'), angle: -90, position: 'insideLeft' }}
          allowDecimals={false}
        />
        <Tooltip formatter={tooltipFormatter} />
        <Legend formatter={legendFormatter} />
        <Bar dataKey="averageAge" fill={theme.chartPrimary} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderNoDataWarning = (): JSX.Element => (
    <Heading6>{t('statistics.noIssuesCreatedYet')}</Heading6>
  );

  const renderChartContent = (): JSX.Element => {
    if (chartData.length) {
      return renderChart();
    }

    return renderNoDataWarning();
  };

  return (
    <StyledChartContainer>
      <DateRangeSelect handleDateChange={handleDateChange} />
      {renderChartContent()}
    </StyledChartContainer>
  );
};
