import dayjs from 'dayjs';

/* 
// Gets the days that is displayed when a month is selected on a calendar view. 
//
// Returns an array of 5 rows and 7 columns (representing a calendar view)
// The rows -> no of weeks in a mth. Col -> no of days in the wk.
*/
export function getDaysInCalendarMonth(month = dayjs().month()) {
  // Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the year
  month = Math.floor(month);

  // Gets current year in number
  const curYear = dayjs().year();

  // return numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to other weeks
  const firstDayOfMonth = dayjs(new Date(curYear, month, 1)).day();

  let curMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      curMonthCount++;
      return dayjs(new Date(curYear, month, curMonthCount));
    });
  });
  return daysMatrix;
}
