import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
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
import { HTMLDateInput } from 'Shared/Elements/DateInput';
import { getDarkTheme } from 'Themes';
import { Api } from 'Utils/Api';
import { getISODateStringFromDate } from 'Utils/getISODateStringFromDate';
import { CreatedVsResolvedChartData, DateRangeData } from '../../fixtures';
import { formatLegendText, formatTooltipText } from '../../helpers';
import { StyledChartContainer } from '../Shared.styled';
import { DateRangeSelect } from '../DateRangeSelect/DateRangeSelect';

interface Props {
  projectId: Id;
}

export const CreatedVsResolvedChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<CreatedVsResolvedChartData[]>([]);
  const theme = useTheme() as ReturnType<typeof getDarkTheme>;

  const handleDateChange = React.useCallback(
    (values: DateRangeData): void => {
      Api.get(`statistics/created_resolved/${projectId}`, {
        startDate: values.startDate,
        finishDate: values.finishDate
      })
        .then((response) => response.json())
        .then((data) => setChartData(data));
    },
    [projectId]
  );

  React.useEffect(() => {
    handleDateChange({
      startDate: getISODateStringFromDate(subDays(new Date(), 7)),
      finishDate: getISODateStringFromDate(new Date())
    });
  }, [handleDateChange]);

  return (
    <StyledChartContainer>
      <DateRangeSelect handleDateChange={handleDateChange} />
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
            label={{ value: t('general.issueCount'), angle: -90, position: 'insideLeft' }}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value: string | number, name: string) => formatTooltipText(value, name, t)}
          />
          <Legend formatter={(value) => formatLegendText(value, t)} />
          <Bar dataKey="created" fill={theme.chartPrimary} />
          <Bar dataKey="resolved" fill={theme.chartSecondary} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
