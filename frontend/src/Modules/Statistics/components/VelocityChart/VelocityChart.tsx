import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
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
import { getDarkTheme } from 'Themes';
import { Api } from 'Utils/Api';
import { VelocityChartData } from '../../fixtures';
import { formatLegendText, formatTooltipText } from '../../helpers';
import { StyledChartContainer } from '../Shared.styled';

interface Props {
  projectId: Id;
}

export const VelocityChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<VelocityChartData[]>([]);
  const theme = useTheme() as ReturnType<typeof getDarkTheme>;

  React.useEffect(() => {
    Api.get(`statistics/velocity/${projectId}`)
      .then((response) => response.json())
      .then((data) => setChartData(data));
  }, [projectId]);

  return (
    <StyledChartContainer>
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
          <XAxis dataKey="name" />
          <YAxis label={{ value: t('general.storyPoints'), angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: string | number, name: string) => formatTooltipText(value, name, t)}
          />
          <Legend formatter={(value) => formatLegendText(value, t)} />
          <Bar dataKey="commitment" fill={theme.chartPrimary} />
          <Bar dataKey="completed" fill={theme.chartSecondary} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
