import Navigation from './components/navigation';
import Filter from './components/filter';
import CalendarHeader from './components/calendarHeader';
import Calendar from './components/calendar';
import { useContext } from 'react';
import GlobalContext from './context/globalContext';

function App() {
  const { monthYearIndex } = useContext(GlobalContext);
  console.log('App: ', monthYearIndex);

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
