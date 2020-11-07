import { msInSecond } from '../../core/constants/ms-in-second';

export function unixTimeToDate(time: number): Date {
  return new Date(time * msInSecond);
}

export function resetTimeForDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
