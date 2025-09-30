import {
    default as axios
} from 'axios';

let holidays: Date[] = [];

interface HolidayResponse {
    date: string;
}

const getHolidays = async (): Promise < Date[] > => {
    if (holidays.length > 0) {
        return holidays;
    }

    try {

        const response = await axios.get < HolidayResponse [] > ("https://content.capta.co/Recruitment/WorkingDays.json");

        holidays = response.data.map(holiday => new Date(holiday + "T00:00:00"));

        return holidays;

    } catch (error) {
        console.error("Falló la obtención de festivos:", error);
        return [];
    }
};

export { getHolidays };