import React from 'react';
import { subDays } from 'date-fns';
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
import { getISODateStringFromDate } from 'Utils/getISODateStringFromDate';
import { AverageAgeChartData } from '../../fixtures';
import { StyledChartContainer } from '../Shared.styled';
import { HTMLDateInput } from '../../../../Shared/Elements/DateInput';

interface Props {
  projectId: Id;
}

export const AverageAgeChart = ({ projectId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState<AverageAgeChartData[]>([]);
  const [inputData, setInputData] = React.useState({
    startDate: getISODateStringFromDate(subDays(new Date(), 7)),
    finishDate: getISODateStringFromDate(new Date())
  });

  React.useEffect(() => {
    Api.get(`statistics/average_age/${projectId}`, {
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
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: t('general.days'), angle: -90, position: 'insideLeft' }}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="averageAge" fill="#ff0000" />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
