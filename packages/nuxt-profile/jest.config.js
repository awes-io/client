module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/tests/**/*.spec.js|**/__tests__/*.js'],
    testURL: 'http://localhost/'
    // watchPlugins: [
    //     'jest-watch-typeahead/filename',
    //     'jest-watch-typeahead/testname'
    // ]
}
