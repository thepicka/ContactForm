import { shallowMount } from '@vue/test-utils'
import App from './App'

const factory = (values = {}) => {
  return shallowMount(App, {
    data () {
           return {
                user: {
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                }
            };
    }
  })
}

describe('App', () => {
  it('renders an error when name is less than 50 characters', () => {
    const wrapper = factory({ name: ''  });

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('renders an error when name is whitespace', () => {
    const wrapper = factory({ name:' '.repeat(50) })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('does not render an error when username is less than 50 and more than 5 characters', () => {
    const wrapper = factory({ name: 'Deepika'  })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
  it('renders an error when subject is less than 100 characters', () => {
    const wrapper = factory({ subject: ''  })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('does not render an error when subject is less than 100 characters', () => {
    const wrapper = factory({ subject: 'Contact form'  })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
  it('renders an error when Message is less than 500 characters', () => {
    const wrapper = factory({message: ''  })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('renders an error when message is whitespace', () => {
    const wrapper = factory({ message: ' '.repeat(500) })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('does not render an error when message is less than 500 characters', () => {
    const wrapper = factory({ name: 'Contact Form App for collecting messages and posting them'  })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
  it('renders an error when Email does not have @', () => {
    const wrapper = factory({ email: 'apple.com'  })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('renders an error when Email is whitespace', () => {
    const wrapper = factory({ email: ' '.repeat(50) }),

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  it('does not render an error when Email is in the format', () => {
    const wrapper = factory({ email: 'deepika.shekhar23@gmail.com'  })

    expect(wrapper.find('.error').exists()).toBeFalsy()
  })

})