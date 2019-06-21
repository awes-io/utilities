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
})