<template>
    <div class="ui-calendar">

        <!-- header -->
        <slot name="header" />

        <!-- weekdays -->
        <div class="ui-calendar__weekdays">
            <template
                v-for="weekday in weekdays"
            >
                <slot name="weekday" :weekday="weekday">
                    <span
                        class="ui-calendar__weekday"
                        :key="weekday"
                    >
                        {{ weekday }}
                    </span>
                </slot>
            </template>
        </div><!-- / weekdays -->

        <!-- days -->
        <div class="ui-calendar__days"
            v-on="this.$slots.day ? {} : { click: _handleDayClick }">
            <template
                v-for="({ date, timestamp, isSelected, isEdge, isToday }, i) in this.days"
            >
                <slot name="day" v-bind="{index: i, date, timestamp, isSelected, isEdge, isToday}">
                    <button
                        type="button"
                        class="ui-calendar__day"
                        :class="{
                            'is-selected': isSelected,
                            'is-edge': isEdge,
                            'is-today': isToday
                        }"
                        :disabled="isEdge"
                        :data-index="! isEdge && i"
                        :key="date.toString()"
                    >
                        {{ date.getDate() }}
                    </button>
                </slot>
            </template>
        </div><!-- / days -->

        <!-- footer -->
        <slot name="footer" />
    </div>
</template>


<script>
import lang from '../../lang/calendar'
import { getCalendarDays } from '../../js/utils/date-time'
import i18nMixin from '../mixins/i18n-utils'

export default {

    name: 'ui-calendar',


    mixins: [ i18nMixin ],


    _config: {
        lang: {
            weekdays: lang.weekdays
        }
    },


    props: {
    
        month: {
            type: Number,
            default() {
                return new Date().getMonth()
            }
        },
        
        year: {
            type: Number,
            default() {
                return new Date().getFullYear()
            }
        },
         
        firstDay: {
            type: Number,
            default: 1,
            validator(dayNum) {
                return dayNum > -1 && dayNum < 7
            }
        },
        
        value: [Array, Date, String, Number]
    },


    computed: {

        todayTimestamp() {
            return this._toDayTimestamp( new Date() )
        },
    
        days() {
            return getCalendarDays(this.month, this.year, this.firstDay)
                .map( date => {
                    let timestamp = date.getTime()
                    return {
                        date,
                        timestamp,
                        isSelected: this.selected.includes(timestamp),
                        isEdge: date.getMonth() !== +this.month,
                        isToday: timestamp === this.todayTimestamp
                    }
                })
        },

        weekdays() {
            return this.days.slice(0,7)
                .map( ({ date }) => this.$lang.weekdays[date.getDay()] )
        },

        selected() {
            return Array.isArray(this.value) ? 
                this.value.map( this._toDayTimestamp ) :
                [ this._toDayTimestamp(this.value) ]
        }
    },


    methods: {

        _toDayTimestamp(input) {
            return new Date(input).setHours(0,0,0,0)
        },

        _handleDayClick($event) {
            //
            let index = $event.target.getAttribute('data-index')
            if ( ! index ) return
            this.$emit('input', this.days[ +index ])
        }
    }
}
</script>