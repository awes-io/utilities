/**
 * Detects if the given value is an object
 *
 * @param {*} val - a variable to check
 *
 */

export function isObject(val) {
    return val != null && typeof val === 'object'
}


/**
 * Detects if the value is empty
 * returns true if the value is `undefined`, `null`, `false`, `''`, `0`, `[]` or `{}`
 *
 * @param {Any} val - value to check
 *
 * @returns {Boolean} - is the value empty
 */
export function isEmpty(val) {
    if ( ! val ) {
        return true
    } else if ( typeof val !== 'function' && val.hasOwnProperty('length') && typeof val.length === 'number' ) {
        return !val.length
    } else if ( typeof val === 'object' ) {
        return !Object.keys(val).length
    }
    return false
}


/**
 * Creates an array by splitting given path to object's value
 *
 * @param {String} path - Path to value in object
 *
 * @returns {Array} Array of levels to object
 *
 * @example
 * // returns ['some', 'nested', '0', 'value']
 * pathToArr('some.nested[0].value')
 * pathToArr('some.nested.0.value')
 *
 */

export function pathToArr(path) {
    return path.split(/(?:\]?\.|\[['"]?|['"]?\])/g).filter(part => part !== '')
}


/**
 * Get a value by given path
 *
 * @param {Object} obj - object to search
 * @param {String} path - path to level
 * @param {*} defaultValue - default value if nothig found
 *
 * @returns {*} value of given path in object
 */

export function get(obj, path, defaultValue) {

    if ( ! isObject(obj) ) {
        console.warn('get supports only objects, ', obj, ' given')
        return defaultValue
    }

    // create a path array of levels from a key
    path = pathToArr(path)

    let current = obj, value

    while (path.length && current) {
        let key = path.shift()
        if (path.length) {
            current = current[key]
        } else {
            value = current[key]
        }
    }

    return typeof value !== 'undefined' ? value : defaultValue
}


/**
 * Sets value in object by given path array
 * > mutates original objects!
 *
 * @param {Object} obj - flattened object
 * @param {Array} path - path levels
 * @param {*} value - value to set
 *
 * @returns {Object} - objects with setted values
 *
 */

export function set(obj, path, value) {

    // create a path array of levels from a key
    let _path = pathToArr(path)

    // set current object level
    let current = obj


    do {

        // get next key
        let _key = _path.shift()

        // check if its a middle or last key
        if (_path.length) {

            // skip if a structure with such key exists
            if (!current[_key]) {

                // creaate an array if next key is numeric or an object otherwise
                let nextStructure = isNaN(_path[0]) ? {} : []
                current[_key] = nextStructure
            }

            // go a level deeper for next iteration
            current = current[_key]

        } else {

            // if this is a last key, set it`s value
            current[_key] = value
        }
    } while (_path.length)

    return obj
}


/**
 * Applies a function to every nested object in given object
 * and passes value, key and object itself
 * 
 * @param  {Array, Object}   obj - given object
 * @param  {Function}        fn  - function to apply
 * 
 * @return {Array, Object}   mutated object
 */

export function forEach(obj, fn) {

    if ( ! isObject(obj) ) return

    let keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++ ) {
        let key = keys[i]
        let val = obj[key]
        if ( isObject(val) ) {
            forEach(val, fn)
        } else {
            fn.call(null, obj[key], key, obj)
        }
    }

    return obj
}