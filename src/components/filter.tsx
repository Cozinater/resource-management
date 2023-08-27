import * as Checkbox from '@radix-ui/react-checkbox';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import { RxCheck } from 'react-icons/rx';

export default function Filter() {
  const {
    bookingTypefilterState,
    bookingStatusfilterState,
    colorToBookingTypeMapping,
    setBookingTypeFilterState,
    setBookingStatusFilterState,
  } = useContext(GlobalContext);

  console.log('Filter: ', bookingTypefilterState, bookingStatusfilterState);

  const borderColor = (bookingType: string) => {
    const [colorToBookingType] = colorToBookingTypeMapping.filter((typeMapping) => {
      return typeMapping.bookingType === bookingType;
    });
    return `border-${colorToBookingType.color}`;
  };

  const checkedBgColor = (bookingType: string) => {
    const [colorToBookingType] = colorToBookingTypeMapping.filter((typeMapping) => {
      return typeMapping.bookingType === bookingType;
    });
    console.log(colorToBookingType);
    return `bg-${colorToBookingType.color}`;
  };

  const handleStatusCheckboxChange = (checkedState: boolean, fieldName: string) => {
    setBookingStatusFilterState(
      [...bookingStatusfilterState].map((object) => {
        if (object.bookingStatusType === fieldName) {
          return {
            ...object,
            checked: checkedState,
          };
        } else {
          return {
            ...object,
          };
        }
      })
    );
    console.log('checked: ', checkedState, fieldName);
  };

  const handleTypeCheckboxChange = (checkedState: boolean, fieldName: string) => {
    setBookingTypeFilterState(
      [...bookingTypefilterState].map((object) => {
        if (object.bookingStatusType === fieldName) {
          return {
            ...object,
            checked: checkedState,
          };
        } else {
          return {
            ...object,
          };
        }
      })
    );
    console.log('checked: ', checkedState, fieldName);
  };

  return (
    <>
      <header className='flex gap-1'>
        <i className='pi pi-calendar'></i>
        <h4>Calendars in View</h4>
      </header>
      <div>Status</div>
      {bookingStatusfilterState.map((bookingStatus) => {
        return (
          <div className='flex items-center'>
            <Checkbox.Root
              className='hover:bg-gray-100 flex h-5 w-5 items-center justify-center rounded border-2 text-gray-700'
              checked={bookingStatus.checked}
              onCheckedChange={(checked) => handleStatusCheckboxChange(!!checked, bookingStatus.bookingStatusType)}
            >
              <Checkbox.Indicator>
                <RxCheck />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <h5 className='pl-[10px] leading-none'>{bookingStatus.bookingStatusType}</h5>
          </div>
        );
      })}

      <div>Booking Types: </div>
      {bookingTypefilterState.map((bookingType) => {
        const { bookingStatusType } = bookingType;
        return (
          <div className='flex items-center'>
            <div className='border-green-500 border-red-500 border-yellow-500 bg-green-500'></div>
            <Checkbox.Root
              className={`hover:bg-gray-100 flex h-5 w-5 items-center justify-center rounded border-2 ${borderColor(
                bookingStatusType
              )} data-[state=checked]:bg-gray-100`}
              checked={bookingType.checked}
              onCheckedChange={(checked) => handleTypeCheckboxChange(!!checked, bookingType.bookingStatusType)}
            >
              <Checkbox.Indicator className={`${checkedBgColor(bookingStatusType)} text-white`}>
                <RxCheck />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label>
              <h5 className='pl-[10px] leading-none'>{bookingType.bookingStatusType}</h5>
            </label>
          </div>
        );
      })}
    </>
  );
}
