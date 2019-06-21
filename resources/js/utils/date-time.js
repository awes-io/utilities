export const weekdaysNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']


/**
 * Creates an array of 42 days to display a calendar
 * 
 * @param  {number} month            from `0` to `11` - month to render, required
 * @param  {number} year             in `XXXX` format - year to render, required
 * @param  {number} [firstDay = 0]   from 0 to 6, e.g. `0 === Sunday`, `1 === Monday`, ...
 *                                   default `0`
 * 
 * @return {Array<Date>}             Array of Date objects of given month and year
 *                                   with edge days to fullfill 6 x 7 square table
 */
export function getCalendarDays(month, year, firstDay = 0) {
  
    const result = [];

    let day = new Date(`${month + 1} 1 ${year}`);

    // Modify first day if not correct
    if (day.getDay() !== firstDay) {
        day.setDate(firstDay - day.getDay() + 1);
    }

    // 6 weeks always displayed to keep size
    for (let i = 0; i < (6 * 7); ++i) {
        result.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }

    return result;
}


export class Time {

    constructor(hours = 0, minutes = 0) {

        if ( hours < 0 || hours > 23 || minutes < 0 || minutes > 59 ) {
            throw new TypeError(`Wrong time format: got ${hours} hours and ${minutes} minutes`)
        }

        this.hours = +hours
        this.minutes = +minutes
    }

    get totalMinutes() {
        return this.hours * 60 + this.minutes
    }

    get _meridiem() {
        return this.hours > 11 ? 'PM' : 'AM'
    }

    get format24h() {
        return `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}`
    }

    get format12h() {
        let hours = this.hours

        if ( hours > 12 && this._meridiem === 'PM' ) {
            hours -= 12
        } else if ( hours === 0 && this._meridiem === 'AM' ) {
            hours = 12
        }

        return `${hours}:${String(this.minutes).padStart(2, '0')} ${this._meridiem}`
    }

    static parse(timeString = '0:0') {

        timeString = timeString.trim()

        let [hours, minutes] = timeString.split(':').map(val => parseInt(val))
        let meridiem = timeString.match(/[pa]m$/i)

        if ( meridiem ) {

            meridiem = meridiem[0].toLowerCase()

            if ( hours < 12 && meridiem === 'pm' ) {
                hours += 12
            } else if ( hours === 12 && meridiem === 'am' ) {
                hours = 0
            }
        }

        return [hours || 0, minutes || 0]
    }
}