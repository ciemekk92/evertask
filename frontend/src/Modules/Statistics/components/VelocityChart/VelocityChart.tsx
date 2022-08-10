import React from 'react';
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
import { Api } from 'Utils/Api';
import { StyledChartContainer } from '../Shared.styled';

interface Props {
  projectId: Id;
}

interface VelocityPoint {
  name: string;
  commitment: number;
  completed: number;
}

export const VelocityChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<VelocityPoint[]>([]);

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
          <Tooltip />
          <Legend />
          <Bar dataKey="commitment" fill="#ff0000" />
          <Bar dataKey="completed" fill="#00ff00" />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
