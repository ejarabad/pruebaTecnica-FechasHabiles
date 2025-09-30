import addWorkingHours from "../services/addWorkingHour.js"
import findNextWorkingDay from "../services/findNextWorkingDay.js"
import { getHolidays } from "../utils/holidayFetcher.js"

const workingHoursTest = async () => {
    console.log("Test de horas")

    const holidays = await getHolidays()

    if(holidays.length === 0){
        console.log("No se pudieron obtener los días festivos para la prueba.")
        return
    }

    const startDate = new Date("2025-10-07 11:00:00");
    
    console.log("Fecha de inicio:", startDate);

    const hoursToAdd = 6

    const adjustedStart = findNextWorkingDay(startDate, holidays);

    console.log("Fecha ajustada al siguiente día hábil si es necesario:", adjustedStart);

    const result = addWorkingHours(adjustedStart, hoursToAdd, holidays);

    console.log(`Fecha después de agregar ${hoursToAdd} horas laborales:`, result);

}

workingHoursTest();