import { isObject, get } from './object'


/**
 * Replaces params in url template with given data
 * 
 * @param  {String}  url      - url template
 * @param  {Object}  data     - data object with params
 * 
 * @return {String}           - replaced url
 *
 * @throws {'url must be a string'} If argument url is not of type String
 *
 * @example
 * // returns 'http://site.com/view/42'
 * urlFromTemplate('http://site.com/{method}/{page.id}', {method: 'view', page: {id: 42}})
 *
 * // return 'http://site.com/42'
 * urlFromTemplate('http://site.com/{method}/{page.id}', {no_method: 'view', page: {id: 42}})
 */
export function urlFromTemplate(url, data) {

    if ( typeof url !== 'string' ) {
        throw new Error('`url` must be a string, ' + typeof url + ' given')
    }

    const tokenRe = /([&?]?\{[\w\s\[\].]+})/g
    const isParamRe = /^([?&])+/
    const paramNameRe = /(\w+)/

    let isFirstParam = true

    // collect all tokens in template
    let tokens = url.match(tokenRe)

    if ( tokens && tokens.length ) {
    
        // replace tokens
        tokens.forEach( token => {

            let isParam = isParamRe.test(token)
            let prop = paramNameRe.exec(token)[0]
            let replacer = ''

            if ( isParam ) {
                let _mock = {}
                _mock[prop] = get(data, prop, '')
                replacer = (isFirstParam ? '?' : '&') + stringifyQuery(_mock)
                isFirstParam = false
            } else {
                replacer = get(data, prop, '')
            }

            url = url.replace(token, replacer)
        })

        // noramlize:
        // replace double slashes
        url = url.replace(/([^:]\/)\/+/g, '$1')

    }

    return url
}


/**
 * Creates a query string from given params
 * @param  {Object}  queryObj query params to stringify
 * @param  {String}  prefix   parent name (for recursive calls)
 * @param  {Array}   str      already built uri components (for recursive calls)
 * @param  {Boolean} isArray  add name in brackets or not (for recursive calls)
 * 
 * @return {String}          stringified query
 *
 * @example
 * // returns space=with%20space&obj%5Bnumber%5D=123&obj%5Barray%5D%5B%5D=1&obj%5Barray%5D%5B%5D=2&obj%5Barray%5D%5B%5D=3
 * // with decodeURIComponents you'll get space=with space&obj[number]=123&obj[array][]=1&obj[array][]=2&obj[array][]=3
 *
 * stringifyQuery({
 *    space: "with space",
 *    obj: {
 *       number: 123,
 *       array: [1, 2, 3]
 *    }
 * })
 * 
 */
export function stringifyQuery(queryObj, prefix, str = [], isArray) {

    for ( let param in queryObj ) {

        // include only own properties
        if ( queryObj.hasOwnProperty(param) ) {
            // TODO: fix param.replace(/\[\]$/, ''), which is quick patch
            let _key = prefix ? prefix + "[" + (isArray ? '' : param) + "]" : /* param */param.replace(/\[\]$/, ''),
                _val = queryObj[param];

            if ( typeof _val === 'undefined' || _val === '' || _val === null ) {
                continue
            } else if ( isObject(_val) ) {
                stringifyQuery(_val, _key, str, Array.isArray(_val))
            } else {
                str.push( encodeURIComponent(_key) + "=" + encodeURIComponent(_val) )
            }
        }
    }

    return str.join('&')
}


/**
 * parses simple query string, no nested params name support
 * 
 * @param  {String} queryStr query to parse
 * @return {Object}          name: value parsed params
 * 
 */

export function parseQuery(queryStr) {

    let { get, set, isEmpty } = AWES.utils.object,
        parsed = {};

    queryStr = queryStr.trim().replace(/^(\?|#|&)/, '')

    if ( isEmpty(queryStr) ) return parsed

    let params = queryStr.split('&')

    params.forEach( param => {
        let [ name, value ] = param.split('=')
        name = decodeURIComponent(name)
        value = decodeURIComponent(value)

        try {
            let _value = JSON.parse(value)
            value = _value
        } catch(e) {}

        // check for array of params
        if ( /\[\]$/.test(name) ) {

            name = name.replace(/\[\]$/, '')

            // check if param already exists
            let _arr = get(parsed, name)

            if ( _arr ) {
                _arr.push(value)
            } else {
                set(parsed, name, [value])
            }

        } else {
            set(parsed, name, value)
        }
    })

    return parsed
}