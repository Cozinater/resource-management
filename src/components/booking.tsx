import { BookingObj } from '../utils/interfaces';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import * as Popover from '@radix-ui/react-popover';
import { RxCross2 } from 'react-icons/rx';

interface BookibgProps {
  booking: BookingObj;
}

export default function Booking({ booking }: BookibgProps) {
  const { colorToBookingTypeMapping } = useContext(GlobalContext);
  console.log('Booking_: ', booking);

  const getBackgroundTextColor = () => {
    // Dynamically assign a color to a type
    let textColor = 'text-white';
    let [colorToBookingType] = colorToBookingTypeMapping.filter((typeMapping) => {
      return typeMapping.bookingType === booking.type;
    });
    if (!colorToBookingType) {
      colorToBookingType = { color: '', bookingType: '' };
      textColor = 'text-black';
    }

    return booking.status === 'CANCELLED'
      ? `bg-opacity-50 bg-${colorToBookingType.color} ${textColor}`
      : `bg-${colorToBookingType.color} ${textColor}`;
  };

  const formatBookingStatus = (status: string) => {
    return status.slice(0, 1) + status.slice(1).toLowerCase();
  };

  const formatBookingStartEndTime = (startTime: string, endTime: string) => {
    return `(${startTime.slice(0, -3)} - ${endTime.slice(0, -3)})`;
  };

  if (!booking.type) {
    return (
      <div className={`${getBackgroundTextColor()}`} style={{ width: '-webkit-fill-available' }}>
        <h5 className='whitespace-nowrap'>{booking.name}</h5>
      </div>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger className={`mt-0.5 ${getBackgroundTextColor()}`} style={{ width: '-webkit-fill-available' }}>
        <h5 className='whitespace-nowrap'>{booking.name}</h5>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className='min-w-md bg-white text-grey-700 rounded-md p-4 shadow'>
          <div className='flex items-center justify-between'>
            <h1> {booking.name}</h1>
            <Popover.Close>
              <RxCross2 />
            </Popover.Close>
          </div>

          <div>
            <h5 className='mb-4'>
              {booking.date.format('MMMM DD') + ' ' + formatBookingStartEndTime(booking.start_time, booking.end_time)}
            </h5>
            <></>
            <h4>{'Type: ' + formatBookingStatus(booking.type)}</h4>
            <h4>{'Status: ' + formatBookingStatus(booking.status)}</h4>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
