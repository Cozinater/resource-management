import { ReactNode, useState } from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';
import { Booking } from '../utils/interfaces';

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
  const curMonth = dayjs().month();
  const curYear = dayjs().year();
  const [monthYearIndex, setMonthYearIndex] = useState({ month: curMonth, year: curYear }); // Stores the current month & Year
  const [bookingsList, setBookingsList] = useState<Booking[]>([
    { code: '', date: '', end_time: '', name: '', start_time: '', status: '', type: '', user_uuid: '', uuid: '' },
  ]);

  return (
    <GlobalContext.Provider
      value={{
        monthYearIndex,
        setMonthYearIndex,
        bookingsList,
        setBookingsList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
