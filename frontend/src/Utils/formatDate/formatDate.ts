import { format } from 'date-fns';

export const formatDateForInput = (date: string | number | Date) =>
  format(new Date(date), 'yyyy-MM-dd');

export const formatDateForDisplay = (date: string | number | Date) =>
  format(new Date(date), 'dd.MM.yyyy');
