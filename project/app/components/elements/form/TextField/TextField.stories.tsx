import type { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField'

export default {
  title: 'Elements/Form/TextField',
  component: TextField,
  args: {
    placeholder: 'change me',
    isInvalid: false,
    disabled: false,
  },
  argTypes: {
    type: {
      control: false,
    },
    onChange: {
      action: 'changed',
    },
    isInvalid: {
      type: 'boolean',
    },
    disabled: {
      type: 'boolean',
    },
    defaultValue: {
      control: false,
    },
    id: {
      control: false,
    },
    name: {
      control: false,
    },
    required: {
      control: false,
    },
    className: {
      control: false,
    },
  },
} as Meta<typeof TextField>

export const Text: StoryObj<typeof TextField> = {
  args: {
    type: 'text',
  },
  render: (args) => <TextField {...args} />,
}

export const Email: StoryObj<typeof TextField> = {
  args: {
    type: 'email',
  },
  render: (args) => <TextField {...args} />,
}

export const Password: StoryObj<typeof TextField> = {
  args: {
    type: 'password',
  },
  render: (args) => <TextField {...args} />,
}
