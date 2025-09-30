import { Calculation } from "../interface/Calculation.js";
import { getHolidays } from "../utils/holidayFetcher.js";
import addWorkingDay from "./addWorkingDay.js";
import addWorkingHours from "./addWorkingHour.js";
import findNextWorkingDay from "./findNextWorkingDay.js";

const dateCalculator = async (params: Calculation): Promise<Date> => {
  const holidays = await getHolidays();

  if (holidays.length === 0) {
    throw new Error(
      "No se pudieron obtener los días festivos para el cálculo."
    );
  }

  let currentDate = params.startDate;

  currentDate = findNextWorkingDay(currentDate, holidays);

  if (params.days> 0) {
    currentDate = addWorkingDay(currentDate, params.days, holidays);
  }

  if (params.hours > 0) {
    currentDate = addWorkingHours(currentDate, params.hours, holidays);
  }

  return currentDate
};

export default dateCalculator;
