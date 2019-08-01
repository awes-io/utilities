<template>
    <div class="ui-calendar__header" @click="_dataAttributeEmitter">

        <time
            class="ui-calendar__caption"
            :datetime="`${showDate.getFullYear()}-${showDate.getMonth() + 1}`"
        >
            <slot :showDate="showDate">

                <!-- month -->
                <button
                    class="ui-calendar__header-button"
                    data-emit="setMonth"
                    type="button"
                >
                    {{ $lang.monthsFull[showDate.getMonth()] }}
                </button>

                <!-- year -->
                <button
                    class="ui-calendar__header-button"
                    data-emit="setYear"
                    type="button"
                >
                    {{ showDate.getFullYear() }}
                </button>
            </slot>
        </time>

        <slot name="prev-month">
            <button
                class="ui-calendar__button is-prev"
                :disabled="prevDisabled"
                type="button"
                data-emit="prevMonth"
            >
                {{ $lang.prevMonth }}
            </button>
        </slot>

        <slot name="next-month">
            <button
                class="ui-calendar__button is-next"
                :disabled="nextDisabled"
                type="button"
                data-emit="nextMonth"
            >
                {{ $lang.nextMonth }}
            </button>
        </slot>
    </div>
</template>


<script>
import lang from '../../lang/calendar'
import i18nMixin from '../mixins/i18n-utils'
import domEventMixin from '../mixins/dom-event-utils'

export default {

    name: 'ui-calendar-header',

    mixins: [i18nMixin, domEventMixin],

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
                return new Date().getMonth()
            }
        },

        prevDisabled: Boolean,

        nextDisabled: Boolean
    },

    _config: {
        lang: {
            monthsFull: lang.monthsFull,
            prevMonth: lang.prevMonth,
            nextMonth: lang.nextMonth
        }
    },

    computed: {

        showDate() {
            return new Date(this.year, this.month)
        }
    }
}
</script>