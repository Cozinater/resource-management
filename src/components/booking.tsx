import { BookingObj } from '../utils/interfaces';

interface BookibgProps {
  booking: BookingObj;
}

export default function Booking({ booking }: BookibgProps) {
  const getBackgroundColor = () => {
    // Dynamically assign a color to a type
    return booking.status === 'CANCELLED' ? 'bg-opacity-50 bg-red-500' : 'bg-red-500';
  };
  return (
    <>
      <div className={`mt-0.5 ${getBackgroundColor()}`}>
        <h5 className='text-white whitespace-nowrap'>{booking.name}</h5>
      </div>
    </>
  );
}
