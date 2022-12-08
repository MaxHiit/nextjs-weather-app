import { format } from 'date-fns';
import { useState } from 'react';
import useInterval from './useInterval';

const useLocalTime = (timezone: number) => {
  const [date, setDate] = useState<string>('')
  const [delay, setDelay] = useState<number>(1000)

  const updateTimes = () => {
    let currentDate = new Date();
    let utc = currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
    let timezoneIntoHours = timezone / 3600;
    let newDateByTimezone = new Date(utc + 3600000 * timezoneIntoHours);
  
    let dateFormeted = format(newDateByTimezone, 'HH:mm - EEEE, d LLL yy');

    setDate(dateFormeted)
  }

  useInterval(
    () => {
      updateTimes()
    },
    delay,
  )
  
  return {date}
}

export default useLocalTime