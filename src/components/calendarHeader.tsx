import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import GlobalContext from '../context/globalContext';
import { useContext } from 'react';

export default function CalendarHeader() {
  const { monthYearIndex, setMonthYearIndex } = useContext(GlobalContext);

  function onClickPrevMonth() {
    setMonthYearIndex({ ...monthYearIndex, month: monthYearIndex.month - 1 });
  }
  function onClickNextMonth() {
    setMonthYearIndex({ ...monthYearIndex, month: monthYearIndex.month + 1 });
  }
  console.log('CalendarHeader: ', setMonthYearIndex);
  return (
    <div className='flex flex-row gap-1 p-3 items-center'>
      <Button icon='pi pi-arrow-circle-left' onClick={onClickPrevMonth} />
      <Button icon='pi pi-arrow-circle-right' onClick={onClickNextMonth} />
      <h2>{dayjs(new Date(monthYearIndex.year, monthYearIndex.month)).format('MMMM YYYY')}</h2>
    </div>
  );
}
