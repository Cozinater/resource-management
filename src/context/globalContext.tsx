import { createContext } from 'react';
import { BookingObj, ColorToBookingTypeMapping, BookingFilterState } from '../utils/interfaces';

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
  bookingTypefilterState: BookingFilterState[];
  setBookingTypeFilterState: (filterState: BookingFilterState[]) => void;
  bookingStatusfilterState: BookingFilterState[];
  setBookingStatusFilterState: (filterState: BookingFilterState[]) => void;
}

const GlobalContext = createContext<GlobalContext>({
  monthYearIndex: { year: 0, month: 0 }, // The current month & year to display on the calendar
  setMonthYearIndex: () => {},
  bookingsList: [],
  setBookingsList: () => {},
  colorToBookingTypeMapping: [],
  setColorToBookingTypeMapping: () => {},
  bookingTypefilterState: [],
  setBookingTypeFilterState: () => {},
  bookingStatusfilterState: [],
  setBookingStatusFilterState: () => {},
});

export default GlobalContext;
