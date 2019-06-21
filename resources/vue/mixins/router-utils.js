import { forEach, isEmpty } from '../js/object'

/**
 * Modifies VueRouter current GET-params and pushes next route
 * applied to VueRouter.prototype
 * 
 * @param {Object} queryObj - params object. If param is set to `null`, 
 *                           `undefined`, or empty `String`,
 *                          it will be deleted from query.
 *                          To set param=null, pass a string `'null'`
 * @param {Boolean} push - true to use history.pushState,
 *                         false to use history.replaceState
 *
 * @return {Object<VueRouter>} - AWES._vueRouter - global Vue router instance
 */
export function setParam(queryObj, push = true) {

    // do nothing if nothing passed
    if ( isEmpty(queryObj) ) return

    // shallow copy next route is enough for reactivity
    let next = Object.assign({}, this.currentRoute)

    // shallow copy route query
    let query = Object.assign({}, this.currentRoute.query)

    // merge queries
    Object.assign(query, queryObj)

    // remove null values
    query = forEach(query, function(val, key, obj) {
        if ( typeof val === 'undefined' || val === '' || val === null ) {
            delete obj[key]
        }
    })

    // set query and push route
    next.query = query
    this[push ? 'push' : 'replace'](next)

    return this
}

/**
 * Component mixin - extends default $router functional
 */

export const routerMixin = {

    beforeCreate() {
        this.$router.$setParam = setParam
    }
}

export default routerMixin