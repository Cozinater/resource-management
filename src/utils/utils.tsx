import dayjs, { Dayjs } from 'dayjs';
import { read, utils } from 'xlsx';
import { BookingObj } from './interfaces';

export interface FetchedBookingObj {
  code: string;
  date: string;
  end_time: string;
  name: string;
  start_time: string;
  status: string;
  type: string;
  user_uuid: string;
  uuid: string;
}

export const NO_OF_DAYS_IN_A_WEEK = 7;

export const MAX_BOOKING_DISPLAY_PER_CELL = 4;

export const BOOKING_COLORS = ['red-500', 'yellow-500', 'green-500', 'blue-500', 'purple-500', 'pink-500'];

// Calculate how many rows is needed to display all of the days in the month
// For some months 6 rows are required. For other months, 5 roos are sufficient.
function getNoOfRowsForCalendarMonth(month: number, year: number, firstDayOfMonth: number) {
  // Get number of days in a month
  const noOfDaysInMonth = dayjs(new Date(year, month, 1)).daysInMonth();

  const curDayCount = 0 - firstDayOfMonth; // Get the day at the top left calendar cell

  if (curDayCount + NO_OF_DAYS_IN_A_WEEK * 5 > noOfDaysInMonth) {
    return 5;
  } else {
    return 6;
  }
}

/* 
// Gets the days that is displayed when a month is selected on a calendar view. 
//
// Returns an array of 5 rows and 7 columns (representing a calendar view)
// The rows -> no of weeks in a mth. Col -> no of days in the wk.
*/
export function getDaysInCalendarMonth(month = dayjs().month(), year = dayjs().year()) {
  // Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the year
  month = Math.floor(month);

  // return numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up/down to other weeks
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let curDayCount = 0 - firstDayOfMonth; // Get the day at the top left calendar cell

  // Return an Matrix representing the days in a monthly view of a calendar
  const daysMatrix = new Array(getNoOfRowsForCalendarMonth(month, year, firstDayOfMonth)).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      curDayCount++;
      return dayjs(new Date(year, month, curDayCount));
    });
  });
  return daysMatrix;
}

// Implement the fetching of csv files & converting into json format
export async function fetchCSVFetcher(url: string): Promise<BookingObj[]> {
  return await fetch(url)
    .then((res) => {
      /* get the data as a Blob */
      return res.arrayBuffer();
    })
    .then((ab) => {
      /* parse the data when it is received */
      const data = new Uint8Array(ab);
      const workbook = read(data, {
        type: 'array',
      });

      /* *****************************************************************
       * Converting Excel value to Json
       ********************************************************************/
      const first_sheet_name = workbook.SheetNames[0];

      console.log('first_sheet_name :', workbook);
      /* Get worksheet */
      const worksheet = workbook.Sheets[first_sheet_name];

      const jsonMeetingsList: FetchedBookingObj[] = utils.sheet_to_json(worksheet, { raw: false });

      /* *****************************************************************
       * Converting Dates to the valid formats
       ********************************************************************/
      return jsonMeetingsList.map((meeting) => {
        return { ...meeting, date: convertDateToDateObj(meeting.date) };
      });
    });
}

export function convertDateToDateObj(dateStr: string): Dayjs {
  return dayjs(dateStr, 'DD/MM/YYYY');
}
