class DateService {

    public static isCurrentWeekDay(date:Date):boolean{

        console.log(date);
        throw new Error('not implemented');

    }

    public static isToday(date:Date):boolean{

        const today = new Date();
        return this.isDatesEqual(today, date);

    }

    public static isYesterday(date:Date):boolean{

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return this.isDatesEqual(yesterday, date);

    }

    private static isDatesEqual(date1:Date, date2:Date):boolean{

        return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();

    }

}

export default DateService;
