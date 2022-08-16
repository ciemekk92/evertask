import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
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
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { ApplicationState } from 'Stores/store';
import { getDarkTheme } from 'Themes';
import { Sprint } from 'Types/Sprint';
import { Api } from 'Utils/Api';
import { BurndownChartData } from '../../fixtures';
import { formatLegendText, formatTooltipText } from '../../helpers';
import { StyledChartContainer } from '../Shared.styled';
import { Heading6 } from 'Shared/Typography';

export const BurndownChart = (): JSX.Element => {
  const { t } = useTranslation();
  const [chartData, setChartData] = React.useState<BurndownChartData[]>([]);
  const [error, setError] = React.useState<Nullable<string>>(null);
  const [selectedSprint, setSelectedSprint] = React.useState<Id>('');
  const theme = useTheme() as ReturnType<typeof getDarkTheme>;

  const fetchChartData = React.useCallback(async (): Promise<void> => {
    setError(null);

    const result = await Api.get(`statistics/burndown/${selectedSprint}`);
    const json = await result.json();
    if (result.status === 200) {
      setChartData(json);
    } else {
      setError(json.message);
    }
  }, [selectedSprint]);

  React.useEffect(() => {
    if (selectedSprint.length) {
      fetchChartData();
    }
  }, [selectedSprint, fetchChartData]);

  const sprints: Sprint.SprintEntity[] = useSelector(
    (state: ApplicationState) => (state.project ? state.project.sprints : []),
    shallowEqual
  );

  const emptyDropdownOption = React.useMemo(
    (): DropdownOption => ({ label: t('statistics.selectSprint'), value: '' }),
    [t]
  );

  const sprintDropdownOptions: DropdownOption[] = React.useMemo(
    () => [
      emptyDropdownOption,
      ...sprints.map((sprint: Sprint.SprintEntity) => ({
        label: `Sprint ${sprint.ordinal}`,
        value: sprint.id
      }))
    ],
    [emptyDropdownOption, sprints]
  );

  const handleSprintChange = (value: Id): void => {
    setSelectedSprint(value);
  };

  const renderChart = (): JSX.Element => (
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
        <Tooltip
          formatter={(value: string | number, name: string) => formatTooltipText(value, name, t)}
        />
        <Legend formatter={(value) => formatLegendText(value, t)} />
        <Line dataKey="remaining" activeDot={{ r: 6 }} stroke={theme.chartSecondary} />
        <Line dataKey="trend" stroke={theme.chartPrimary} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderErrorMessage = (): JSX.Element => {
    return <Heading6>{error}</Heading6>;
  };

  const renderChartContent = (): JSX.Element => {
    if (error) {
      return renderErrorMessage();
    }

    return renderChart();
  };

  return (
    <StyledChartContainer>
      <SingleSelectDropdown
        options={sprintDropdownOptions}
        value={selectedSprint}
        onChange={handleSprintChange}
      />
      {renderChartContent()}
    </StyledChartContainer>
  );
};
