import { useContext } from 'react';
import CalendarCell from './calendarCell';
import { getDaysInCalendarMonth } from '../utils/utils';
import GlobalContext from '../context/globalContext';
import dayjs from 'dayjs';

interface CalendarDayProps {
  day: dayjs.Dayjs;
}

function CalendarDay({ day }: CalendarDayProps) {
  return <h5>{day.format('dddd').toUpperCase()}</h5>;
}

export default function Calendar() {
  const { monthYearIndex } = useContext(GlobalContext);
  const daysInCalendarMonth = getDaysInCalendarMonth(monthYearIndex.month, monthYearIndex.year);
  console.log('Calendar: ', monthYearIndex);

  return (
    <>
      <header className='grid grid-cols-7 text-gray-700 '>
        {daysInCalendarMonth[0].map((day, i) => (
          <CalendarDay day={day} key={i} />
        ))}
      </header>
      <div className='pb-1 h-full grid grid-cols-7 text-gray-700 auto-rows-1fr'>
        {daysInCalendarMonth.map((week) => week.map((day, idx) => <CalendarCell day={day} key={idx} />))}
      </div>
    </>
  );
}
