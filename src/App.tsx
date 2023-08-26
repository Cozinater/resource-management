import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';
import { useContext } from 'react';
import GlobalContext from './context/globalContext';
import { useQueries } from '@tanstack/react-query';
import { fetchCSVFetcher, getUniqueBookingTypes } from './utils/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { BookingObj } from './utils/interfaces';

function App() {
  const { monthYearIndex, bookingsList, setBookingsList, setColorToBookingTypeMapping } = useContext(GlobalContext);
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

  console.log(bookingQueriesList);

  // Handle loading and error
  if (bookingQueriesList.find((bookingQueries) => bookingQueries.error)) {
    return <>Error</>;
  }

  if (bookingQueriesList.find((bookingQueries) => bookingQueries.isLoading)) {
    return (
      <div className='flex item-center'>
        <CircularProgress />
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
    setColorToBookingTypeMapping(getUniqueBookingTypes(tempBookingsList));
    console.log('App_: ', getUniqueBookingTypes(tempBookingsList));
  }

  console.log('bookingsList: ', bookingsList);

  return (
    <>
      <div className='mx-auto grid grid-cols-9 gap-3 max-w-screen-2xl min-w-screen-md h-screen p-3 '>
        <div className='col-span-2'>
          <Navigation />
          <Filter />
        </div>
        <div className='col-span-7 grid' style={{ gridTemplateRows: 'auto auto 1fr' }}>
          <CalendarHeader />
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default App;
