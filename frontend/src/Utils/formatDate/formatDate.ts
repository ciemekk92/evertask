import { format } from 'date-fns';

export const formatDate = (date: string | number | Date) => format(new Date(date), 'yyyy-MM-dd');
