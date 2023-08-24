import { Button } from 'primereact/button';

export default function CalendarHeader() {
  return (
    <div className='flex flex-row gap-1 p-2 items-center'>
      <Button icon='pi pi-arrow-circle-left' />
      <Button icon='pi pi-arrow-circle-right' />
      <h2>CalendarHeader</h2>
    </div>
  );
}
