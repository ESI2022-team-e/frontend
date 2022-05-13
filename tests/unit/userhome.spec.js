import {shallowMount} from '@vue/test-utils'
import UserHome from '@/views/UserHome.vue'

describe('UserHome.vue', () => {
    it('renders Lorem ipsum when passed', () => {
        const msg = 'Lorem ipsum'
        const wrapper = shallowMount(UserHome, {
            props: {msg}
        })
        expect(wrapper.text()).toMatch(msg)
    })
})
