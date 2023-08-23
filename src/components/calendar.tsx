import { useEffect, useState } from 'react';
import CalendarCells from './calendarCells';
import { getDaysInCalendarMonth } from '../utils';

export default function Calendar() {
  const [curMonth, setCurMonth] = useState(getDaysInCalendarMonth());

  const monthIndex = 7;

  useEffect(() => {
    setCurMonth(getDaysInCalendarMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5'>
      {curMonth.map((week, i) => week.map((day, idx) => <CalendarCells day={day} key={idx} rowIdx={i} />))}
    </div>
  );
}
