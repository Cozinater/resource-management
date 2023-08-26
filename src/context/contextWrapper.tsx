import { ReactNode, useState } from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';
import { BookingObj, ColorToBookingTypeMapping } from '../utils/interfaces';

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
  const curMonth = dayjs().month();
  const curYear = dayjs().year();
  const [monthYearIndex, setMonthYearIndex] = useState({ month: curMonth, year: curYear }); // Stores the current month & Year
  const [bookingsList, setBookingsList] = useState<BookingObj[]>([]);
  const [colorToBookingTypeMapping, setColorToBookingTypeMapping] = useState<ColorToBookingTypeMapping[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        monthYearIndex,
        setMonthYearIndex,
        bookingsList,
        setBookingsList,
        colorToBookingTypeMapping,
        setColorToBookingTypeMapping,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
