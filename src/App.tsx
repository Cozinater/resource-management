import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';
import { useContext } from 'react';
import GlobalContext from './context/globalContext';
import { useQueries } from '@tanstack/react-query';
import { BOOKING_COLORS, fetchCSVFetcher } from './utils/utils';
import { BookingObj, ColorToBookingTypeMapping, BookingFilterState } from './utils/interfaces';

function App() {
  const {
    monthYearIndex,
    bookingsList,
    setBookingsList,
    setColorToBookingTypeMapping,
    setBookingStatusFilterState,
    setBookingTypeFilterState,
  } = useContext(GlobalContext);
  console.log('App: ', monthYearIndex);

  // Fetch Data from CSV files
  const bookingQueriesList = useQueries({
    queries: [
      {
        queryKey: ['colabQuery'],
        queryFn: () => fetchCSVFetcher('csv/colab.csv'),
      },
      {
        queryKey: ['itcdQuery'],
        queryFn: () => fetchCSVFetcher('csv/itcd.csv'),
      },
      {
        queryKey: ['xcolabQuery'],
        queryFn: () => fetchCSVFetcher('csv/xcolab.csv'),
      },
      {
        queryKey: ['xitcdQuery'],
        queryFn: () => fetchCSVFetcher('csv/xitcd.csv'),
      },
    ],
  });

  // Handle loading and error
  if (bookingQueriesList.find((bookingQueries) => bookingQueries.error)) {
    return <>Error</>;
  }

  // Display a loading spinner while the data is being fetched
  if (bookingQueriesList.find((bookingQueries) => bookingQueries.isLoading)) {
    return (
      <div className='left-1/2 fixed top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  if (bookingQueriesList.every((bookingQueries) => bookingQueries.status === 'success') && bookingsList.length < 2) {
    let tempBookingsList: BookingObj[] = [];

    bookingQueriesList.forEach((bookingQuery) => {
      const { data } = bookingQuery;
      if (data && data.length > 0) {
        tempBookingsList = tempBookingsList.concat(data);
      }
    });

    setBookingsList(tempBookingsList);

    // Set Color To Booking Type Mapping
    const uniqueBookingTypes = getUniqueBookingTypes(tempBookingsList);
    const bookingTypeColorMapping = getBookingTypesColorMapping(uniqueBookingTypes, BOOKING_COLORS);
    setColorToBookingTypeMapping(bookingTypeColorMapping);

    // Set Filter States of Booking Types
    setBookingTypeFilterState(getBookingTypeFilterStates(uniqueBookingTypes));

    // Set Filter States of Booking Status
    const uniqueBookingStatus = getUniqueBookingStatus(tempBookingsList);
    getBookingStatusFilterStates(uniqueBookingStatus);
    setBookingStatusFilterState(getBookingStatusFilterStates(uniqueBookingStatus));
  }

  return (
    <>
      <div className='mx-auto grid grid-cols-9 gap-3 max-w-screen-2xl min-w-screen-md h-screen p-3 '>
        <div className='col-span-2 flex flex-col gap-3'>
          <Navigation />
          <Filter />
        </div>
        <div className='col-span-7 grid' style={{ gridTemplateRows: 'auto auto 1fr', overflowY: 'overlay' }}>
          <CalendarHeader />
          <Calendar />
        </div>
      </div>
    </>
  );
}

function getUniqueBookingTypes(bookingsList: BookingObj[]): string[] {
  return [...new Set(bookingsList.map((booking) => booking.type))];
}

function getUniqueBookingStatus(bookingsList: BookingObj[]): string[] {
  return [...new Set(bookingsList.map((booking) => booking.status))];
}

function getBookingTypesColorMapping(uniqueBookingTypes: string[], colors: string[]): ColorToBookingTypeMapping[] {
  return uniqueBookingTypes.map((bookingType, i) => {
    return {
      bookingType,
      color: colors[((i % colors.length) + colors.length) % colors.length],
    };
  });
}

function getBookingTypeFilterStates(uniqueBookingTypes: string[]): BookingFilterState[] {
  return uniqueBookingTypes.map((booking) => {
    return {
      bookingStatusType: booking,
      checked: true,
    };
  });
}

function getBookingStatusFilterStates(uniqueBookingStatus: string[]): BookingFilterState[] {
  return uniqueBookingStatus.map((booking) => {
    return {
      bookingStatusType: booking,
      checked: true,
    };
  });
}

export default App;
