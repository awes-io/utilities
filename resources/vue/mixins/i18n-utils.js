import { get } from '../../js/utils/object'

export default {

    props: {

        lang: Object
    },

    computed: {
        // TODO: fix objects merging (replace ???)
        // TODO: write test for external lang prop
        '$lang': function() {
            return { ...get(this.$options, '_config.lang', {}), ...this.lang }
        }
    }
}