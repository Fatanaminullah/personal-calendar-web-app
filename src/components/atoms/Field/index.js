import {Form} from 'antd';
import React from 'react';
import {CustomInput} from '../../molecules';

const Field = ({
  children,
  name,
  label,
  labelCol,
  labelAlign,
  validation,
  wrapperCol,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      labelCol={labelCol}
      labelAlign={labelAlign}
      wrapperCol={wrapperCol}
      shouldUpdate
      rules={validation}>
      {children}
    </Form.Item>
  );
};

export default Field;
