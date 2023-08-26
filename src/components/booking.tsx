import { BookingObj } from '../utils/interfaces';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';

interface BookibgProps {
  booking: BookingObj;
}

export default function Booking({ booking }: BookibgProps) {
  const { colorToBookingTypeMapping } = useContext(GlobalContext);
  console.log('Booking_: ', colorToBookingTypeMapping);

  const getBackgroundColor = () => {
    // Dynamically assign a color to a type
    let textColor = 'text-white';
    let [colorToBookingType] = colorToBookingTypeMapping.filter((typeMapping) => {
      return typeMapping.bookingType === booking.type;
    });

    console.log('_Booking_: ', colorToBookingType, booking.type);
    if (!colorToBookingType) {
      colorToBookingType = { color: '', bookingType: '' };
      textColor = 'text-black';
    }

    return booking.status === 'CANCELLED'
      ? `bg-opacity-50 ${colorToBookingType.color} ${textColor}`
      : `${colorToBookingType.color} ${textColor}`;
  };
  return (
    <>
      <div className={`mt-0.5 ${getBackgroundColor()}`}>
        <h5 className='whitespace-nowrap'>{booking.name}</h5>
      </div>
    </>
  );
}
