import { isSameDay, isWeekend, set } from "date-fns";
import { getHolidays } from "../utils/holidayFetcher.js";

const findNextWorkingDay = (date: Date, holidays: Date[]) => {
  let currentDate = new Date(date);

  console.log("Fecha inicial: ", currentDate);

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

  if (currentDate.getHours() < 8) {
    currentDate = set(currentDate, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  } else if (currentDate.getHours() === 12) {
    currentDate = set(currentDate, {
      hours: 13,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  } else if (currentDate.getHours() >= 17) {
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate = set(currentDate, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  }

  return currentDate;
};

export default findNextWorkingDay;
