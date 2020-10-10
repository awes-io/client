import { shallowMount } from '@vue/test-utils'
import Login from '../src/pages/Login.vue'

describe('Login page', () => {
    it('renders props.message when passed', () => {
        const wrapper = shallowMount(Login)

        expect(wrapper.isVueInstance()).toBe(true)
    })
})
