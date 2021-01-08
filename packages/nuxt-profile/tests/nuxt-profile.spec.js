import { shallowMount } from '@vue/test-utils'
import Profile from '../src/pages/Profile.vue'

describe('NuxtProfile.vue', () => {
    it('renders props.message when passed', () => {
        const wrapper = shallowMount(Profile)

        expect(wrapper.isVueInstance()).toBe(true)
    })
})
