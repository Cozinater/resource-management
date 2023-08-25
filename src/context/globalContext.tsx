import { SetStateAction, createContext, Dispatch } from 'react';

interface MonthYearIndex {
  year: number;
  month: number;
}

const GlobalContext = createContext({
  monthYearIndex: { year: 0, month: 0 }, // The current month & year to display on the calendar
  setMonthYearIndex: (monthYearIndex: MonthYearIndex) => {},
});

export default GlobalContext;
