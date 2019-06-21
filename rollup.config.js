const isDev = process.env.NODE_ENV === 'development'

const vue = require('rollup-plugin-vue')
const uglify = require('rollup-plugin-terser').terser
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const commonJs = require('rollup-plugin-commonjs')

module.exports = {
    input: './resources/js/main.js',
    output: {
        file: './dist/js/main.js',
        format: 'iife'
    },
    plugins: [
        vue({
            css: false,
            template: {
                compilerOptions: {
                    whitespace: 'condense',
                    preserveWhitespace: false
                }
            }
        }),
        nodeResolve({
            mainFields: ['module', 'main']
        }),
        commonJs({
            include: 'node_modules/**',
            sourceMap: false
        }),
        json()
    ]
}

if ( ! isDev ) {
    module.exports.plugins.push( uglify() )
}
