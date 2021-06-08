/* eslint-disable eqeqeq */
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  MoreOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import {Col, Dropdown, Form, Menu, message, Popconfirm, Row, Space} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Calendar, EventFormModal} from '../../components';
import {setEventsData} from '../../redux/store/actions/events';
import {colors, generateRandomColor} from '../../utilities';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const {events} = useSelector((state) => state.events);
  const [selectedDate, setSelectedDate] = useState(moment().format('D'));
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    if (!isEditing) {
      if (events[selectedDate].length < 3) {
        const event = [
          ...events[selectedDate],
          {...values, color: generateRandomColor()},
        ];
        const request = {
          ...events,
          [selectedDate]: event,
        };
        dispatch(setEventsData(request));
        closeModal();
        message.success('Events Created!');
      } else {
        message.error('You have reach your maximum events of a day!');
      }
    } else {
      const event = events[selectedDate].map((item, index) => {
        if (index === selectedEvent.id) {
          return {...values};
        } else {
          return {...item};
        }
      });
      const request = {
        ...events,
        [selectedDate]: event,
      };
      dispatch(setEventsData(request));
      closeModal();
      message.success(`Events ${selectedEvent.name} successfully edited!`);
    }
  };
  const closeModal = () => {
    setVisibleModal(false);
    setSelectedEvent({});
    setIsEditing(false);
    form.resetFields();
  };
  const deleteEvents = (index, name) => {
    const tempEvents = events[selectedDate];
    tempEvents.splice(index, 1);
    const request = {
      ...events,
      [selectedDate]: tempEvents,
    };
    dispatch(setEventsData(request));
    message.success(`Events ${name} successfully deleted!`);
  };

  return (
    <>
      <EventFormModal
        visibleModal={visibleModal}
        closeModal={closeModal}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isEditing={isEditing}
        form={form}
      />
      <Row>
        <Col
          span={24}
          style={{
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: 20,
          }}>
          <h1 style={{margin: '10px 0'}}>Your Personal Calendar</h1>
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              alignSelf: 'center',
              padding: 35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '90%',
              boxShadow:
                '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
            }}>
            <Row style={{width: '100%'}}>
              <Col xs={24} md={24} lg={14}>
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  events={events}
                />
              </Col>
              <Col xs={24} md={24} lg={10}>
                <Row
                  justify={
                    events[selectedDate].length ? 'space-between' : 'center'
                  }
                  style={{padding: 10}}>
                  <h2 style={{margin: '10px 0'}}>Events</h2>
                  {events[selectedDate].length ? (
                    <Button
                      icon={<PlusCircleFilled />}
                      type="secondary-outlined"
                      text="Add Events"
                      onClick={() => setVisibleModal(true)}
                    />
                  ) : null}
                </Row>
                {!events[selectedDate].length ? (
                  <div
                    style={{
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      height: '80%',
                      minHeight: 300,
                    }}>
                    <p style={{fontSize: 16}}>No events created</p>
                    <Button
                      icon={<PlusCircleFilled />}
                      type="secondary-outlined"
                      text="Let's create your first event!"
                      onClick={() => setVisibleModal(true)}
                    />
                  </div>
                ) : (
                  events[selectedDate].map((item, index) => (
                    <div
                      style={{
                        backgroundColor: item.color,
                        borderRadius: 5,
                        padding: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxShadow:
                          '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
                        marginBottom: 10,
                      }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            textAlign: 'left',
                          }}>
                          {item.name}
                        </p>
                        <Dropdown
                          arrow
                          placement="bottomRight"
                          trigger={['click']}
                          overlay={
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  setSelectedEvent({
                                    ...item,
                                    id: index,
                                    time: item.time.map((x) => moment(x)),
                                  });
                                  setIsEditing(true);
                                  setVisibleModal(true);
                                  form.setFieldsValue({
                                    ...item,
                                    id: index,
                                    time: item.time.map((x) => moment(x)),
                                  });
                                }}>
                                <Space
                                  align="center"
                                  style={{
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}>
                                  <EditOutlined />
                                  <p style={{marginBottom: 0}}>Edit</p>
                                </Space>
                              </Menu.Item>
                              <Menu.Item>
                                <Popconfirm
                                  title="Are you sure to delete this event?"
                                  onConfirm={() =>
                                    deleteEvents(index, item.name)
                                  }
                                  okText="Yes"
                                  cancelText="No">
                                  <Space
                                    align="center"
                                    style={{cursor: 'pointer'}}>
                                    <DeleteOutlined />
                                    <p style={{marginBottom: 0}}>Delete</p>
                                  </Space>
                                </Popconfirm>
                              </Menu.Item>
                            </Menu>
                          }>
                          <MoreOutlined
                            style={{cursor: 'pointer', height: 15}}
                          />
                        </Dropdown>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          textAlign: 'left',
                        }}>
                        <ClockCircleOutlined
                          style={{fontSize: 14, marginRight: 5}}
                        />
                        {`${moment(item.time[0]).format('HH:mm:ss')} - ${moment(
                          item.time[1],
                        ).format('HH:mm:ss')}`}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          textAlign: 'left',
                        }}>
                        <MailOutlined style={{fontSize: 14, marginRight: 5}} />
                        {item.invitees.map((item) => `${item.email}, `)}
                      </p>
                    </div>
                  ))
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
