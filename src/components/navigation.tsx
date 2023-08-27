import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import GlobalContext from '../context/globalContext';
import localeData from 'dayjs/plugin/localeData';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';
dayjs.extend(localeData); // use plugin

export default function Navigation() {
  const { monthYearIndex, setMonthYearIndex } = useContext(GlobalContext);
  const [yearIndex, setYearIndex] = useState<number>(Number(dayjs().format('YYYY')));
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(monthYearIndex.month);
  const monthsArray = dayjs.monthsShort();
  console.log('Navigation', yearIndex);

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

  const selectedButtonColor = (monthIndex: number) => {
    if (
      monthIndex === selectedMonthIndex &&
      dayjs(new Date(monthYearIndex.year, monthYearIndex.month, 1)).isSame(
        new Date(yearIndex, selectedMonthIndex, 1),
        'year'
      )
    ) {
      return 'shadow-no-color text-green-500';
    }
    return '';
  };

  const selectedTextColor = (monthIndex: number) => {
    if (
      monthIndex === selectedMonthIndex &&
      dayjs(new Date(monthYearIndex.year, monthYearIndex.month, 1)).isSame(
        new Date(yearIndex, selectedMonthIndex, 1),
        'year'
      )
    ) {
      return 'text-green-500';
    }
    return '';
  };

  return (
    <div className='grid gap-3 shadow-no-color p-3 text-gray-700'>
      <header className='bg-gray-200 grid grid-cols-3 ' style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <button onClick={onClickPrevMonth}>
          <RxTriangleLeft />
        </button>
        <h5>{yearIndex}</h5>
        <button onClick={onClickNextMonth} className='ml-auto'>
          <RxTriangleRight />
        </button>
      </header>
      <div className='grid grid-cols-3 grid-rows-4'>
        {monthsArray.map((month, i) => {
          return (
            <button key={i} className={`w-full ${selectedButtonColor(i)}`} onClick={() => onClickMonth(i)}>
              <h5 className={`item-center flex justify-center py-1 ${selectedTextColor(i)}`}>{month.toUpperCase()}</h5>
            </button>
          );
        })}
      </div>
      <footer className='text-black contents'>
        <h5 className='mx-auto'>
          Today is
          <b className='text-green-500'>&nbsp;{dayjs().format('ddd, MMMM DD, YYYY')}</b>
        </h5>
      </footer>
    </div>
  );
}
