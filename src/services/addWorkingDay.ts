import { isWeekend, addDays, isSameDay } from 'date-fns';

const addWorkingDay = (
    startDate: Date,
    daysToAdd: number,
    holyDays: Date[]
) => {
    let currentDate = new Date(startDate);

    while (daysToAdd > 0) {
        currentDate = addDays(currentDate, 1)

        if(!isWeekend(currentDate) &&
           !holyDays.some(holiday => isSameDay(holiday, currentDate))) {
            daysToAdd--;
        }
    }

    return currentDate;
}

export default addWorkingDay;