import dayjs from 'dayjs';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import Booking from './booking';
import { MAX_BOOKING_DISPLAY_PER_CELL } from '../utils/utils';

interface Props {
  day: dayjs.Dayjs;
}

export default function CalendarCell({ day }: Props) {
  const { bookingsList } = useContext(GlobalContext);

  let bookingsToDisplay = bookingsList.filter((booking) => booking.date.format('DD-MM-YY') === day.format('DD-MM-YY'));

  const len = bookingsToDisplay.length;

  if (len > MAX_BOOKING_DISPLAY_PER_CELL) {
    bookingsToDisplay = bookingsToDisplay.slice(0, 6);
    bookingsToDisplay[MAX_BOOKING_DISPLAY_PER_CELL + 1] = {
      ...bookingsToDisplay[MAX_BOOKING_DISPLAY_PER_CELL + 1],
      name: `${len - MAX_BOOKING_DISPLAY_PER_CELL} more ...`,
      type: '',
    };
  }

  const currentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-green-500 text-white rounded-md w-fit p-0.5 -mt-0.5'
      : '';
  };
  return (
    <>
      <div className='shadow-no-color text-gray-200 p-1'>
        <h5 className={`${currentDayClass()} text-gray-700`}>{day.format('DD')}</h5>
        <div>
          {bookingsToDisplay.map((booking) => {
            return <Booking booking={booking} />;
          })}
        </div>
      </div>
    </>
  );
}
