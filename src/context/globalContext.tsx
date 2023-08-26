import { createContext } from 'react';
import { BookingObj, ColorToBookingTypeMapping } from '../utils/interfaces';

interface MonthYearIndex {
  year: number;
  month: number;
}

interface GlobalContext {
  monthYearIndex: MonthYearIndex;
  setMonthYearIndex: (monthYearIndex: MonthYearIndex) => void;
  bookingsList: BookingObj[];
  setBookingsList: (bookingsList: BookingObj[]) => void;
  colorToBookingTypeMapping: ColorToBookingTypeMapping[];
  setColorToBookingTypeMapping: (colorToBookingTypeMapping: ColorToBookingTypeMapping[]) => void;
}

const GlobalContext = createContext<GlobalContext>({
  monthYearIndex: { year: 0, month: 0 }, // The current month & year to display on the calendar
  setMonthYearIndex: (monthYearIndex) => {},
  bookingsList: [],
  setBookingsList: (bookingsList) => {},
  colorToBookingTypeMapping: [],
  setColorToBookingTypeMapping: (colorToBookingTypeMapping) => {},
});

export default GlobalContext;
