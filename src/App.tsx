import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';
import { getDaysInCalendarMonth } from './utils';

function App() {
  console.table(getDaysInCalendarMonth());
  return (
    <div className='items-center'>
      <div className='grid grid-cols-10 gap-3 max-w-7xl h-screen'>
        <div className='bg-blue-100 col-span-3'>
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
