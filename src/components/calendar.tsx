import { useEffect, useState } from 'react';
import CalendarCell from './calendarCell';
import { getDaysInCalendarMonth } from '../utils';

import dayjs from 'dayjs';

interface Props {
  day: dayjs.Dayjs;
}

function CalendarDay({ day }: Props) {
  return <h5 className='calendar-cell'>{day.format('dddd').toUpperCase()}</h5>;
}

export default function Calendar() {
  const [curMonth, setCurMonth] = useState(getDaysInCalendarMonth());

  const monthIndex = 7;

  useEffect(() => {
    setCurMonth(getDaysInCalendarMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <header className='grid grid-cols-7 text-gray-700 '>
        {curMonth[0].map((day) => (
          <CalendarDay day={day} />
        ))}
      </header>
      <div className='h-full grid grid-cols-7 grid-rows-5 text-gray-700'>
        {curMonth.map((week, i) => week.map((day, idx) => <CalendarCell day={day} key={idx} />))}
      </div>
    </>
  );
}
