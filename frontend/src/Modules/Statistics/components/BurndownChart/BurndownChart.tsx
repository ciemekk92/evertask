import React from 'react';
import { useTranslation } from 'react-i18next';
import { Api } from 'Utils/Api';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { StyledChartContainer } from '../Shared.styled';

interface Props {
  sprintId: Id;
}

interface BurndownPoint {
  name: string;
  remaining: number;
  trend: number;
}

export const BurndownChart = ({ sprintId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [chartData, setChartData] = React.useState<BurndownPoint[]>([]);

  React.useEffect(() => {
    Api.get(`statistics/burndown/${sprintId}`)
      .then((response) => response.json())
      .then((data) => setChartData(data));
  }, [sprintId]);

  return (
    <StyledChartContainer>
      <ResponsiveContainer width="90%" height={600}>
        <LineChart
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
          <XAxis dataKey="name" interval={chartData.length > 8 ? 2 : 1} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="remaining" activeDot={{ r: 6 }} stroke="#ff0000" />
          <Line dataKey="trend" stroke="#00ff00" />
        </LineChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
