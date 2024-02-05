import { Meta, ComponentStoryFn } from "@storybook/react";
import Input from "./index";

export default {
  component: Input,
  title: "Atoms/Input",
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더",
      table: {
        type: { summary: "string" },
      },
    },
    hasBorder: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "보더 플래그",
      table: {
        type: { summary: "boolean" },
      },
    },
    hasError: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "배리에이션 에러 플래그",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<typeof Input>;

const Template: ComponentStoryFn<typeof Input> = (args) => {
  return <Input {...args} />;
};
// const Template: ComponentStory<typeof StyledButton> = (args) => <StyledButton {...args} />;
export const Normal = Template.bind({});

export const Error = Template.bind({});
