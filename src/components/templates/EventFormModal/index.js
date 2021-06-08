/* eslint-disable eqeqeq */
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Col, Form, Input, Modal, Row, TimePicker} from 'antd';
import React from 'react';
import {Button} from '../../atoms';

const EventFormModal = ({
  visibleModal,
  closeModal,
  onFinish,
  onFinishFailed,
  isEditing,
  form,
}) => {
  return (
    <>
      <Modal
        title={isEditing ? 'Edit Event' : 'Add Event'}
        visible={visibleModal}
        onCancel={() => {
          closeModal();
        }}
        footer={[
          <Button
            text="Cancel"
            type="light"
            onClick={() => {
              closeModal();
            }}
          />,
        ]}>
        <Form
          form={form}
          name="events-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="name"
            label="Name"
            labelCol={{span: 6}}
            rules={[
              {
                required: true,
                message: 'Field Required',
              },
            ]}
            shouldUpdate
            labelAlign="left">
            <Input style={{borderRadius: 5}} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            style={{width: '100%'}}
            labelCol={{span: 6}}
            rules={[
              {
                required: true,
                message: 'Field Required',
              },
            ]}
            shouldUpdate
            labelAlign="left">
            <TimePicker.RangePicker style={{width: '100%', borderRadius: 5}} />
          </Form.Item>
          <Row>
            <Col span={6}>
              <label className="label-required">Invitees</label>
            </Col>
            <Col span={17}>
              <label>Email</label>
            </Col>
          </Row>
          <Form.List
            name="invitees"
            rules={[
              {
                required: true,
                message: 'Field Required',
              },
            ]}
            shouldUpdate>
            {(fields, {add, remove}, {errors}) => (
              <>
                {fields.map((field) => {
                  return (
                    <Row>
                      <Col span={6} />
                      <Col span={17}>
                        <Form.Item
                          {...field}
                          rules={[
                            {
                              required: true,
                              message: 'Field Required',
                            },
                            {
                              type: 'email',
                              message: 'Incorrect email format',
                            },
                          ]}
                          name={[field.name, 'email']}
                          fieldKey={[field.fieldKey, 'email']}>
                          <Input style={{borderRadius: 5}} />
                        </Form.Item>
                      </Col>
                      <Col
                        span={1}
                        style={{
                          padding: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <MinusCircleOutlined
                          style={{fontSize: 16}}
                          onClick={() => remove(field.name)}
                        />
                      </Col>
                    </Row>
                  );
                })}
                <Col offset={6} span={18}>
                  <Form.ErrorList errors={errors} />
                </Col>
                <Col offset={6} span={18}>
                  <Form.Item>
                    <Button
                      dashed
                      size="medium"
                      type="light"
                      text="Add Field"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button text="Submit" block type="primary" htmlType="submit" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventFormModal;
