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

  console.log("INICIO DEL CALCULO");
  console.log("1. HORA LOCAL INICIAL", currentDate.toISOString());

  currentDate = findNextWorkingDay(currentDate, holidays);

  console.log("2. PRIMER DIA HABIL", currentDate.toISOString());

  if (params.days> 0) {
    currentDate = addWorkingDay(currentDate, params.days, holidays);
    console.log("3. SUMA DIAS HABIL", currentDate.toISOString());
  }

  if (params.hours > 0) {
    currentDate = addWorkingHours(currentDate, params.hours, holidays);
    console.log("4. SUMA HORAS HABIL", currentDate.toISOString());
  }

  return currentDate
};

export default dateCalculator;
