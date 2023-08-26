import { Dayjs } from 'dayjs';

export interface BookingObj {
  code: string;
  date: Dayjs;
  end_time: string;
  name: string;
  start_time: string;
  status: string;
  type: string;
  user_uuid: string;
  uuid: string;
}

// export interface BookingTypeColors {
//   color: 'bg-red-500' | 'bg-yellow-500' | 'bg-green-500' | 'bg-blue-500' | 'bg-purple-500' | 'bg-pink-500';
// }

export interface ColorToBookingTypeMapping {
  bookingType: string;
  color: string;
}
