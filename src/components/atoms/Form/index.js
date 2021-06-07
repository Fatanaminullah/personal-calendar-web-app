import {Form} from 'antd';
import React, {useEffect} from 'react';

const CustomForm = ({
  children,
  defaultValues,
  name,
  onSubmit,
  onSubmitFailed,
  formRef,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (formRef) {
      formRef.setFieldsValue(defaultValues);
    } else {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues, form]);
  return (
    <Form
      onValuesChange={(changedValues, allValues) => {
        form.setFieldsValue(changedValues);
      }}
      form={formRef || form}
      name={name}
      onFinish={onSubmit}
      initialValues={defaultValues}
      onFinishFailed={onSubmitFailed}>
      {React.Children.map(children, (child) => {
        if (child) {
          return child;
        }
      })}
    </Form>
  );
};

export default CustomForm;
