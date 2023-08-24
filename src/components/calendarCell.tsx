import dayjs from 'dayjs';

interface Props {
  day: dayjs.Dayjs;
}

export default function CalendarCell({ day }: Props) {
  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-green-400 text-white rounded-md w-fit p-0.5 -mt-0.5'
      : '';
  };
  return (
    <div className='calendar-cell'>
      <div className={`${getCurrentDayClass()}`}>{day.format('DD')}</div>
    </div>
  );
}
