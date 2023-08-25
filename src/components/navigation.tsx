import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import GlobalContext from '../context/globalContext';
import { Button } from 'primereact/button';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData); // use plugin

export default function Navigation() {
  const { monthYearIndex, setMonthYearIndex } = useContext(GlobalContext);
  const [yearIndex, setYearIndex] = useState<number>(Number(dayjs().format('YYYY')));
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(monthYearIndex.month);
  const monthsArray = dayjs.monthsShort();
  console.log(yearIndex);

  function onClickPrevMonth() {
    setYearIndex(yearIndex - 1);
  }
  function onClickNextMonth() {
    setYearIndex(yearIndex + 1);
  }

  function onClickMonth(selectedMonthIndex: number) {
    setMonthYearIndex({ month: selectedMonthIndex, year: yearIndex });
    setSelectedMonthIndex(selectedMonthIndex);
  }

  const getSelectedMonth = (monthIndex: number, element: string) => {
    if (element === 'text') {
      return monthIndex === selectedMonthIndex ? 'text-green-500' : '';
    } else {
      return monthIndex === selectedMonthIndex ? 'border-green-500 border' : '';
    }
  };

  return (
    <div className='grid gap-3 calendar-cell p-3 text-gray-700'>
      <header className='bg-gray-200 grid grid-cols-3 ' style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <Button icon='pi pi-caret-left' onClick={onClickPrevMonth} />
        <h5>{yearIndex}</h5>
        <Button icon='pi pi-caret-right' onClick={onClickNextMonth} />
      </header>
      <body className='grid grid-cols-3 grid-rows-4'>
        {monthsArray.map((month, i) => {
          return (
            <Button className={`w-full ${getSelectedMonth(i, 'button')}`} onClick={() => onClickMonth(i)}>
              <h5 className={`item-center flex justify-center py-1 ${getSelectedMonth(i, 'text')}`}>
                {month.toUpperCase()}
              </h5>
            </Button>
          );
        })}
      </body>
      <footer className='text-black'>
        <h5 className='item-center flex justify-center'>
          Today is &nbsp;
          <span className='text-green-500'>
            <b>{dayjs().format('ddd, MMMM DD')},</b>
          </span>
        </h5>
        <h5 className='item-center flex justify-center text-green-500'>
          <b>{dayjs().format('YYYY')}</b>
        </h5>
      </footer>
    </div>
  );
}
