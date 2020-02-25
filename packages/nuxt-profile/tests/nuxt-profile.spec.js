import { shallowMount } from '@vue/test-utils'
import NuxtProfile from '../src/components/NuxtProfile.vue'

describe('NuxtProfile.vue', () => {
    it('renders props.message when passed', () => {
        const message = 'New message'

        const wrapper = shallowMount(NuxtProfile, {
            propsData: { message }
        })

        expect(wrapper.text()).toMatch(message)
    })
})
