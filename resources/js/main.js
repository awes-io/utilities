import Vue from 'vue/dist/vue.js'
import Calendar from '../vue/components/calendar.vue'
import CalendarHeader from '../vue/components/calendar-header.vue'
import CalendarMonths from '../vue/components/calendar-months.vue'
import CalendarYears from '../vue/components/calendar-years.vue'

Vue.component('ui-calendar', Calendar)
Vue.component('ui-calendar-header', CalendarHeader)
Vue.component('ui-calendar-months', CalendarMonths)
Vue.component('ui-calendar-years', CalendarYears)

const app = new Vue({
    el: '#app'
});
