import { Calendar } from 'react-native-calendars'; //For calendar UI

type Props = {
    selectedDate: string; //date selected by user
    onDateSelect: (date: string) => void;
    //callback which notifies parent component when a new date selected
  };

export default function CalendarView({ selectedDate, onDateSelect }: Props) {
  return (
    <Calendar
      //when the user taps on a day it sends a date string back to parent
      onDayPress={day => onDateSelect(day.dateString)}
      //Highlights the selected date with blue
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: '#3399ff' },
      }}
    />
  );
}
