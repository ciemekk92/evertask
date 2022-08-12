import React from 'react';
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
import { Api } from 'Utils/Api';
import { getISODateStringFromDate } from 'Utils/getISODateStringFromDate';
import { StyledChartContainer } from '../Shared.styled';

interface Props {
  projectId: Id;
}

interface CreatedVsResolvedPoint {
  name: string;
  created: number;
  resolved: number;
}

export const CreatedVsResolvedChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<CreatedVsResolvedPoint[]>([]);
  const [inputData, setInputData] = React.useState({
    startDate: getISODateStringFromDate(subDays(new Date(), 7)),
    finishDate: getISODateStringFromDate(new Date())
  });

  React.useEffect(() => {
    Api.get(`statistics/created_resolved/${projectId}`, {
      startDate: inputData.startDate,
      finishDate: inputData.finishDate
    })
      .then((response) => response.json())
      .then((data) => setChartData(data));
  }, [projectId, inputData.startDate, inputData.finishDate]);

  const handleDateChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  return (
    <StyledChartContainer>
      <HTMLDateInput
        name="startDate"
        min={getISODateStringFromDate(subDays(new Date(), 30))}
        max={getISODateStringFromDate(new Date())}
        value={inputData.startDate}
        onChange={handleDateChange}
      />
      <HTMLDateInput
        name="finishDate"
        min={getISODateStringFromDate(subDays(new Date(), 30))}
        max={getISODateStringFromDate(new Date())}
        value={inputData.finishDate}
        onChange={handleDateChange}
      />
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
          <YAxis label={{ value: t('general.issueCount'), angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="created" fill="#ff0000" />
          <Bar dataKey="resolved" fill="#00ff00" />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
