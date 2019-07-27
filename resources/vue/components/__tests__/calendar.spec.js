import { mount } from '@vue/test-utils'
import uiCalendar from '../calendar.vue'

describe('Calendar', () => {

    it('matches overall snapshot', () => {

        const wrapper = mount(uiCalendar, {
            propsData: {
                month: 6,
                year: 2019
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('passes timestamp to "day" scoped slot', () => {

        const wrapper = mount(uiCalendar, {
            propsData: {
                month: 6,
                year: 2019,
            },
            scopedSlots: {
                day: `<p class="day">{{ props.timestamp }}</p>`
            }
        })

        expect(wrapper.find('.day').text()).toEqual('1561928400000')
    })
})