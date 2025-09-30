import { isSameDay, isWeekend, set } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const BOGOTA_TZ = "America/Bogota";

const findNextWorkingDay = (date: Date, holidays: Date[]) => {
  let currentDate = new Date(date);

  while (
    isWeekend(currentDate) ||
    holidays.some((holiday) => isSameDay(holiday, currentDate))
  ) {
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate = set(currentDate, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  }

  const currentHour = parseInt(formatInTimeZone(currentDate, BOGOTA_TZ, "H"));

  if (currentHour < 8) {
    currentDate = set(currentDate, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  } else if (currentHour === 12) {
    currentDate = set(currentDate, {
      hours: 13,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  } else if (currentHour >= 17) {
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate = set(currentDate, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    return findNextWorkingDay(currentDate, holidays);
  }

  return currentDate;
};

export default findNextWorkingDay;
