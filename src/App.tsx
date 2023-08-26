import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from './context/globalContext';
import { useQueries } from '@tanstack/react-query';
import { fetchCSVFetcher } from './utils/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { Booking } from './utils/interfaces';

function App() {
  const { monthYearIndex, bookingsList, setBookingsList } = useContext(GlobalContext);
  // const [tempBookingsList, setTempBookingsList] = useState<any[]>([]);
  const [curBookingsList, setCurBookingsList] = useState<any[]>([]);
  // let valueSet = false;
  // let bookingQueriesList: UseQueryResult<Booking[]>[] = [];
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
    let tempBookingsList: Booking[] = [];

    bookingQueriesList.forEach((bookingQuery) => {
      const { data } = bookingQuery;
      console.log(data);
      if (data && data.length > 0) {
        tempBookingsList = tempBookingsList.concat(data);
      }
    });

    setBookingsList(tempBookingsList);
    // valueSet = true;
  }

  // function test() {
  //   bookingQueriesList.forEach((bookingQuery) => {
  //     const { data } = bookingQuery;
  //     console.log(data);
  //     if (data && data.length > 0) {
  //       setTempBookingsList((tempBookingsList) => [...tempBookingsList, ...data]);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   test();
  // }, []);
  // useEffect(() => {

  // }, []);

  // useEffect(() => {
  //   if (bookingQueriesList.find((bookingQueries) => bookingQueries.status === 'success')) {
  //     let tempBookingsList: Booking[] = [];

  //     bookingQueriesList.forEach((bookingQuery) => {
  //       const { data } = bookingQuery;
  //       console.log(data);
  //       if (data && data.length > 0) {
  //         tempBookingsList = tempBookingsList.concat(data);
  //       }
  //     });

  //     setCurBookingsList(tempBookingsList);
  //   }
  // }, [bookingQueriesList]);

  console.log('bookingsList: ', bookingsList);

  return (
    <div className='items-center box-border'>
      <div className='grid grid-cols-9 gap-3 max-w-7xl h-screen p-3 '>
        <div className='col-span-2'>
          <Navigation />
          <Filter />
        </div>
        <div className='col-span-7 grid' style={{ gridTemplateRows: 'auto auto 1fr' }}>
          <CalendarHeader />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
