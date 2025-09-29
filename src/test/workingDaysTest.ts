import addWorkingDay from "../services/addWorkingDay.js";
import { getHolidays } from "../utils/holidayFetcher.js";

const runWorkingDayTest = async () => {
  console.log("Test de addWorkingDay");

  const holidays = await getHolidays();

  if (holidays.length === 0) {
    console.log("No se pudieron obtener los festivos. Abortando test.");
    return;
  } else {
    console.log("Cantidad de festivos obtenidos:", holidays.length);
  }

  const startDate = new Date("2025-10-03T12:00:00Z");
  const daysToAdd = 5;

  const resultDate = addWorkingDay(startDate, daysToAdd, holidays);
  console.log(
    `Fecha inicial: ${startDate.toISOString()}, Días a agregar: ${daysToAdd}, Fecha resultante: ${resultDate.toISOString()}`
  );

  console.log("Test finalizado");
};

runWorkingDayTest();