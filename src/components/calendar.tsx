import { useContext } from 'react';
import CalendarCell from './calendarCell';
import { getDaysInCalendarMonth } from '../utils';
import GlobalContext from '../context/globalContext';
import dayjs from 'dayjs';

interface CalendarDayProps {
  day: dayjs.Dayjs;
}

function CalendarDay({ day }: CalendarDayProps) {
  return <h5 className='calendar-cell'>{day.format('dddd').toUpperCase()}</h5>;
}

export default function Calendar() {
  const { monthIndex } = useContext(GlobalContext);
  const curMonth = getDaysInCalendarMonth(monthIndex);
  console.log('Calendar: ', monthIndex);

  return (
    <>
      <header className='grid grid-cols-7 text-gray-700 '>
        {curMonth[0].map((day, i) => (
          <CalendarDay day={day} key={i} />
        ))}
      </header>
      <div className='h-full grid grid-cols-7 grid-rows-5 text-gray-700'>
        {curMonth.map((week) => week.map((day, idx) => <CalendarCell day={day} key={idx} />))}
      </div>
    </>
  );
}
