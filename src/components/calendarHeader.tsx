import dayjs from 'dayjs';
import GlobalContext from '../context/globalContext';
import { useContext } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

export default function CalendarHeader() {
  const { monthYearIndex, setMonthYearIndex } = useContext(GlobalContext);

  function onClickPrevMonth() {
    setMonthYearIndex({ ...monthYearIndex, month: monthYearIndex.month - 1 });
  }
  function onClickNextMonth() {
    setMonthYearIndex({ ...monthYearIndex, month: monthYearIndex.month + 1 });
  }

  return (
    <div className='flex flex-row gap-1 p-3 items-center'>
      <button onClick={onClickPrevMonth}>
        <BsArrowLeftCircle />
      </button>
      <button onClick={onClickNextMonth}>
        <BsArrowRightCircle />
      </button>
      <h2>{dayjs(new Date(monthYearIndex.year, monthYearIndex.month)).format('MMMM YYYY')}</h2>
    </div>
  );
}
