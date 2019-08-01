<template>
    <div
        class="ui-calendar__months"
        v-on="_listeners"
    >
        <template v-for="{index, isActive, isDisabled} in monthsData">
            <slot
                name="month"
                v-bind="{
                    index,
                    name: $lang.monthsFull[index],
                    isActive,
                    isDisabled
                }"
            >
                <button
                    type="button"
                    class="ui-calendar__month"
                    :class="{'is-active': isActive}"
                    :disabled="isDisabled"
                    data-emit="setMonth"
                    :data-args="index"
                >
                    {{ $lang.monthsFull[index] }}
                </button>
            </slot>
        </template>
    </div>
</template>


<script>
import { isEmpty } from '../../js/utils/object'
import lang from '../../lang/calendar'
import i18nMixin from '../mixins/i18n-utils'
import domEventMixin from '../mixins/dom-event-utils'

export default {

    name: 'ui-calendar-months',

    mixins: [i18nMixin, domEventMixin],

    props: {

        month: Number,

        monthsDisabled: Array,
    },

    _config: {
        lang: {
            monthsFull: lang.monthsFull
        }
    },

    computed: {

        monthsData() {
            return Array.from(Array(12).keys()).map( index => ({
                index,
                isActive: this.month === index,
                isDisabled: this.monthsDisabled && this.monthsDisabled.includes(index)
            }))
        },

        _listeners() {
            return isEmpty(this.$scopedSlots.month) ? { click: this._dataAttributeEmitter } : {}
        }
    }
}
</script>