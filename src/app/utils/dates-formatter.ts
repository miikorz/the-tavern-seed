import * as moment from 'moment';
export class DatesFormatter {
    public static longOnlyDayToCalendarDay(dateLong: any) {
        const date = {
            year: null,
            month: null,
            day: null
        };
        date.year = parseInt(moment(dateLong, 'YYYYMMDD').format('YYYY'), 10);
        date.month = parseInt(moment(dateLong, 'YYYYMMDD').format('MM'), 10);
        date.day = parseInt(moment(dateLong, 'YYYYMMDD').format('DD'), 10);
        return date;
    }

    public static calendarDateToLongOnlyDay(calendarDate: any) {
        return parseFloat(moment({year: calendarDate.year, month: calendarDate.month - 1, day: calendarDate.day}).format('YYYYMMDD'));
    }
}
