import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';

function App() {
  return (
    <div className='items-center'>
      <div className='grid grid-cols-10 gap-3 max-w-7xl'>
        <div className='bg-blue-100 col-span-3'>
          <Navigation />
          <Filter />
        </div>
        <div className='bg-red-100 col-span-7'>
          <CalendarHeader />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
