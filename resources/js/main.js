import Vue from 'vue/dist/vue.js'
import Calendar from '../vue/components/calendar.vue'

Vue.component('ui-calendar', Calendar)

const app = new Vue({
    el: '#app'
});
