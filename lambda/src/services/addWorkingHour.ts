import {
  addHours,
  addMinutes,
  differenceInMinutes,
  getHours,
  set,
} from "date-fns";
import findNextWorkingDay from "./findNextWorkingDay.js";

const addWorkingHours = (date: Date, hours: number, holidays: Date[]) => {
  let currentDate = new Date(date);
  let remainingMinutes = hours * 60;

  if (remainingMinutes <= 0) {
    return currentDate;
  }

  while (remainingMinutes > 0) {
    const currentHour = getHours(currentDate);
    let endOfBlock: Date;
    if (currentHour < 12) {
      endOfBlock = set(currentDate, {
        hours: 12,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    } else {
      endOfBlock = set(currentDate, {
        hours: 17,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    }

    const minutesInBlock = differenceInMinutes(endOfBlock, currentDate);
    const minutesToProcess = Math.min(remainingMinutes, minutesInBlock);

    if (minutesToProcess > 0) {
      currentDate = addMinutes(currentDate, minutesToProcess);
      remainingMinutes -= minutesToProcess;
    }

    if (remainingMinutes > 0) {
      currentDate = findNextWorkingDay(currentDate, holidays);
    }
  }

  return currentDate;
};

export default addWorkingHours;
