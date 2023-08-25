import { ReactNode, useState } from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
  const curMonth = dayjs().month();
  const curYear = dayjs().year();
  const [monthYearIndex, setMonthYearIndex] = useState({ month: curMonth, year: curYear }); // Stores the current month & Year

  return (
    <GlobalContext.Provider
      value={{
        monthYearIndex,
        setMonthYearIndex,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
