import Vue from 'vue'

const requireComponent = require.context(
    '../components',
    false,
    /[A-Z]\w+\.vue$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

    Vue.component(componentName, componentConfig.default || componentConfig)
})
