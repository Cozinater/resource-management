import dayjs from 'dayjs';

interface Props {
  day: dayjs.Dayjs;
  rowIdx: number;
}

export default function CalendarCells({ day, rowIdx }: Props) {
  return (
    <>
      <div>{day.format('DD')}</div>
      {/* <div>{rowIdx}</div> */}
    </>
  );
}
