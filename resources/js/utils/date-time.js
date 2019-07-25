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

    let day = new Date(year, month);

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