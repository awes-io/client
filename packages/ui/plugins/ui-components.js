import Vue from 'vue'
import { keys } from 'rambdax'
import * as exported from '../components/index'

const requireComponent = require.context(
    '../components',
    false,
    /[A-Z]\w+\.vue$/
)

const exportedComponents = keys(exported)

requireComponent.keys().forEach(fileName => {
    const componentName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

    // use only components, exported by library
    if (!exportedComponents.includes(componentName)) return

    const componentConfig = requireComponent(fileName)

    Vue.component(componentName, componentConfig.default || componentConfig)
})
