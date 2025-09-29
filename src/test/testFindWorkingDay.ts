import findNextWorkingDay from "../services/findNextWorkingDay.js";
import { getHolidays } from "../utils/holidayFetcher.js";

const runWorkingDayTest = async () => {
  console.log("Test de findWorkingDay");

  const holidays = await getHolidays();

  if (holidays.length === 0) {
    console.log("No se pudieron obtener los festivos. Abortando test.");
    return;
  } else {
    console.log("Cantidad de festivos obtenidos:", holidays.length);
  }

  /* const friday = new Date("2025-10-03T12:00:00Z");
  findNextWorkingDay(friday, holidays); */

  const thursday = new Date("2025-10-02T22:00:00Z");
  findNextWorkingDay(thursday, holidays);

  console.log("Test finalizado");
};

runWorkingDayTest();
