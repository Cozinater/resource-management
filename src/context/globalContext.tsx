import { createContext } from 'react';

const GlobalContext = createContext({
  monthIndex: 0, // The current month to display on the calendar
  setMonthIndex: (index: number) => {},
});

export default GlobalContext;
