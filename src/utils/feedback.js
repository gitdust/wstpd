import { message } from 'antd';

message.config({
  duration: 1,
});

export const success = (text) => {
  message.success(text);
};

export const error = (text) => {
  message.error(text);
};

export const warning = (text) => {
  message.warning(text);
};