import { ReactNode, useState } from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month()); // Stores the current month

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
