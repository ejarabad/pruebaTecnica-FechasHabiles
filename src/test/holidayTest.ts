import { getHolidays } from "../utils/holidayFetcher.js"

const testHoliday = async () => {
    const holidays = await getHolidays();
    console.log(holidays);
}

testHoliday();

