import { createContext } from 'react';
import { Booking } from '../utils/interfaces';

interface MonthYearIndex {
  year: number;
  month: number;
  bookingList: Booking[];
}

const GlobalContext = createContext({
  monthYearIndex: { year: 0, month: 0 }, // The current month & year to display on the calendar
  setMonthYearIndex: (monthYearIndex: MonthYearIndex) => {},
  bookingsList: [
    { code: '', date: '', end_time: '', name: '', start_time: '', status: '', type: '', user_uuid: '', uuid: '' },
  ],
  setBookingsList: (bookingsList: Booking[]) => {},
});

export default GlobalContext;
