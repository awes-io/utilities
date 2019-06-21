module.exports = {
    moduleFileExtensions: [
        'js',
        'vue'
    ],
    moduleDirectories: [
        'resources/js/utils',
        'node_modules'
    ],
    transform: {
        '^.*\\.(vue)$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    setupFiles: [
        '<rootDir>/jest.init.js'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/resources/vue/components/*.vue',
        '<rootDir>/resources/js/utils/*.js'
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['html', 'text-summary']
}