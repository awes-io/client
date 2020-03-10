import { shallowMount } from '@vue/test-utils'
import NuxtAuth from '../src/components/NuxtAuth.vue'

describe('NuxtAuth.vue', () => {
    it('renders props.message when passed', () => {
        const message = 'New message'

        const wrapper = shallowMount(NuxtAuth, {
            propsData: { message }
        })

        expect(wrapper.text()).toMatch(message)
    })
})
