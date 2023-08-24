import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import GlobalContext from '../context/globalContext';
import { useContext } from 'react';

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function onClickPrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function onClickNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  console.log('CalendarHeader: ', monthIndex);
  return (
    <div className='flex flex-row gap-1 p-2 items-center'>
      <Button icon='pi pi-arrow-circle-left' onClick={onClickPrevMonth} />
      <Button icon='pi pi-arrow-circle-right' onClick={onClickNextMonth} />
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h2>
    </div>
  );
}
