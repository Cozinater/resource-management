import dayjs from 'dayjs';

interface Props {
  day: dayjs.Dayjs;
}

export default function CalendarCell({ day }: Props) {
  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-green-500 text-white rounded-md w-fit p-0.5 -mt-0.5'
      : '';
  };
  return (
    <div className='calendar-cell'>
      <h5 className={`${getCurrentDayClass()}`}>{day.format('DD')}</h5>
    </div>
  );
}
