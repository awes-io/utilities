<template>
    <div
        class="ui-calendar__years"
        v-on="_listeners"
    >
        <template v-for="_year in years">
            <slot
                name="year"
                :isActive="year === _year"
            >
                <button
                    type="button"
                    class="ui-calendar__year"
                    :class="{'is-active': year === _year}"
                    data-emit="setYear"
                    :data-args="_year"
                >
                    {{ _year }}
                </button>
            </slot>
        </template>
    </div>
</template>


<script>
import { isEmpty } from '../../js/utils/object'
import domEventMixin from '../mixins/dom-event-utils'

export default {

    name: 'ui-calendar-months',

    mixins: [domEventMixin],

    props: {

        year: Number,

        years: Array
    },

    computed: {

        _listeners() {
            return isEmpty(this.$scopedSlots.year) ? { click: this._dataAttributeEmitter } : {}
        }
    }
}
</script>