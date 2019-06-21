import { 
    Time
} from '../date-time'

describe('Time', () => {

    it('has static method to parse dates to array of hours and minutes in 24h format', () => {

        let time = Time.parse('1:45 pm')

        expect( time[0] ).toBe(13)
        expect( time[1] ).toBe(45)
    })


    it('parses time correctly', () => {

        let time;

        ['12:00AM', '12:00 am', '00:00', '0:0'].forEach( _time => {
            
            time = Time.parse(_time)

            expect( time[0] ).toBe(0)
            expect( time[1] ).toBe(0)
        });

        ['12:10PM', '12:10 pm', '12:10', '12:10'].forEach( _time => {
            
            time = Time.parse(_time)

            expect( time[0] ).toBe(12)
            expect( time[1] ).toBe(10)
        })
    })


    it('creates new Time instance', () => {

        let time = new Time(15, 30)

        expect( time ).toEqual({ hours: 15, minutes: 30 })
    })


    it('calculates total minutes', () => {

        let time = new Time(2, 30)

        expect( time.totalMinutes ).toBe(150)
    })


    it('foramts time to 12h', () => {

        let time = new Time(17, 22)

        expect( time.format12h ).toBe('5:22 PM')
    })


    it('foramts time to 24h', () => {

        let time = new Time(6, 15)

        expect( time.format24h ).toBe('06:15')
    })
})