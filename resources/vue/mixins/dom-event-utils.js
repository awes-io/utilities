export default {

    methods: {

        _dataAttributeEmitter($event) {

            let btn = $event.target

            if ( ! btn.hasAttribute('data-emit') ) {
                btn = btn.closest('[data-emit]')
            }

            if ( ! btn ) return

            let event = btn.getAttribute('data-emit')
            let args = btn.hasAttribute('data-args') ? JSON.parse(btn.getAttribute('data-args')) : true

            this.$emit(event, args)
        }
    }
}