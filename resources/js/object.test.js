import { 
    isObject,
    isEmpty,
    pathToArr,
    get,
    set
} from './object'


describe('The isObject method', () => {

    it('returns {Boolean}false on undefined, null, Number, Boolean, NaN, String, Function', () => {

        // undefined
        expect( isObject() ).toBe(false)
        expect( isObject(undefined) ).toBe(false)

        // null
        expect( isObject(null) ).toBe(false)

        // number
        expect( isObject(0) ).toBe(false)
        expect( isObject(Infinity) ).toBe(false)
        expect( isObject(NaN) ).toBe(false)

        // string
        expect( isObject('') ).toBe(false)
        expect( isObject('test') ).toBe(false)

        // function
        expect( isObject(function(){}) ).toBe(false)

    })

    it('returns {Boolean}true on Array and Objects', () => {

        // array
        expect( isObject([]) ).toBe(true)

        // object
        expect( isObject({}) ).toBe(true)
        expect( isObject(new Object()) ).toBe(true)
    })
})


describe('The isEmpty method', () => {

    it('returns {Boolean}false on undefined; null; false; 0; empty String, Aarray and Object', () => {

        expect( isEmpty() ).toBe(true)
        expect( isEmpty(undefined) ).toBe(true)
        expect( isEmpty(null) ).toBe(true)
        expect( isEmpty(false) ).toBe(true)
        expect( isEmpty('') ).toBe(true)
        expect( isEmpty(0) ).toBe(true)
        expect( isEmpty([]) ).toBe(true)
        expect( isEmpty({}) ).toBe(true)
    })

    it('returns {Boolean}true on true; function; String; Array and Object with values', () => {

        expect( isEmpty(true) ).toBe(false)
        expect( isEmpty('test') ).toBe(false)
        expect( isEmpty(function(){}) ).toBe(false)
        expect( isEmpty(['']) ).toBe(false)
        expect( isEmpty({test: ''}) ).toBe(false)
    })
})


describe('The pathToArr method', () => {

    const result = ['some', 'nested', '0', 'value']

    it('supports both dot and bracket notation', () => {

        expect( pathToArr('some.nested[0].value') ).toEqual(result)
        expect( pathToArr('some.nested.0.value') ).toEqual(result)
    })

    it('supports single and double quots', () => {

        expect( pathToArr('some["nested"].0.value') ).toEqual(result)
        expect( pathToArr('some["nested"][0][\'value\']') ).toEqual(result)
    })

    it('supports spaces', () => {

        expect( pathToArr('[\'with\']["spaced value"]') ).toEqual(['with', 'spaced value'])
    })
})


describe('The get method', () => {

    const mock = {
        number: 1,
        boolean: false,
        array: [
            [1,2,3],
            'two',
            {
                prop: 'test'
            }
        ],
        object: {
            'empty one': {},
            property: ['a', 'b', 'c']
        }
    }


    it('returns values', () => {
        
        expect( get(mock, 'number') ).toBe(1)
        expect( get(mock, 'boolean') ).toBe(false)
    })

    it('returns exact objects', () => {
        
        expect( get(mock, 'object') ).toBe(mock.object)
    })

    it('returns nested values', () => {
        
        expect( get(mock, 'object.property[2]') ).toBe('c')
    })

    it('returns default value if seeked not found', () => {

        expect( get(mock, 'proper.ty', 'default') ).toBe('default')
    })

    it('returns default value on non-objects', () => {

        expect( get(null, 'proper.ty', 'default') ).toBe('default')
        expect( get(42, 'proper.ty') ).toBe(undefined)
    })
})


// describe('The set method', () => {

//     it('sets given values by paths', () => {

        
//     })
// })