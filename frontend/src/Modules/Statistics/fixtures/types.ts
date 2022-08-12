interface BaseChartData {
  name: string;
}

export interface BurndownChartData extends BaseChartData {
  remaining: number;
  trend: number;
}

export interface VelocityChartData extends BaseChartData {
  commitment: number;
  completed: number;
}

export interface CreatedVsResolvedChartData extends BaseChartData {
  created: number;
  resolved: number;
}

export interface AverageAgeChartData extends BaseChartData {
  averageAge: number;
}
