import { get } from '../../js/utils/object'

export default {

    props: {

        lang: Object
    },

    computed: {

        '$lang': function() {
            return { ...this.lang, ...get(this.$options, '_config.lang', {}) }
        }
    }
}