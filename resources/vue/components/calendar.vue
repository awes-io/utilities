<template>
    <div class="ui-calendar">
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
        </div>
        <div class="ui-calendar__days">
            <template
                v-for="{ date, timestamp, isSelected, isEdge } in this.days"
            >
                <slot name="day" v-bind="{date, timestamp, isSelected, isEdge}">
                    <button
                        class="ui-calendar__day"
                        :class="{
                            'is-selected': isSelected,
                            'is-edge': isEdge
                        }"
                        :key="timestamp"
                        @click="! isEdge && $emit('input', { date, timestamp, isSelected })"
                    >
                        {{ date.getDate() }}
                    </button>
                </slot>
            </template>
        </div>
    </div>
</template>


<script>
import { weekdaysNames, getCalendarDays } from '../../js/utils/date-time'
import i18nMixin from '../mixins/i18n-utils'

export default {

    name: 'ui-calendar',


    mixins: [ i18nMixin ],


    _config: {
        lang: {
            weekdays: weekdaysNames
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
            default: 0,
            validator(dayNum) {
                return dayNum > -1 && dayNum < 7
            }
        },
        
        value: [Array, Date, String, Number]
    },


    computed: {
    
        days() {
            return getCalendarDays(this.month, this.year, this.firstDay)
                .map( date => {
                    let timestamp = date.getTime()
                    return {
                        date,
                        timestamp,
                        isSelected: this.selected.includes(timestamp),
                        isEdge: date.getMonth() !== +this.month
                    }
                })
        },

        weekdays() {
            return this.days.slice(0,7)
                .map( ({ date }) => this.$lang.weekdays[date.getDay()] )
        },

        selected() {
            return Array.isArray(this.value) ? 
                this.value.map( this._toTimeStamp ) :
                [ this._toDayTimeStamp(this.value) ]
        }
    },


    methods: {

        _toDayTimeStamp(input) {
            return new Date(input).setHours(0,0,0,0)
        }
    }
}
</script>