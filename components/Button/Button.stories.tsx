import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonProps } from '@/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    intent: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'neutral',
        'danger',
        'dark',
        'disabled',
        'ghost',
      ],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'base', 'large'],
      control: { type: 'radio' },
    },
    length: {
      options: ['auto', 'xs', 'small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    as: {
      control: false,
    },
    href: {
      control: false,
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
    },
    children: {
      control: false,
    },
  },
} as Meta;

type Story = StoryObj<typeof ButtonProps>;

export const Primary: Story = {
  render: (props) => (
    <Button as="button" {...props}>
      Button
    </Button>
  ),
  args: { intent: 'primary' },
};

export const Secondary: Story = {
  ...Primary,
  args: { intent: 'secondary' },
};

export const Tertiary: Story = {
  ...Primary,
  args: { intent: 'tertiary' },
};

export const Neutral: Story = {
  ...Primary,
  args: { intent: 'neutral' },
};

export const Danger: Story = {
  ...Primary,
  args: { intent: 'danger' },
};

export const Dark: Story = {
  ...Primary,
  args: { intent: 'dark' },
};

export const Ghost: Story = {
  ...Primary,
  args: { intent: 'ghost' },
};
