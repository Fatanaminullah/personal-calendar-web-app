import {Col, Row} from 'antd';
import React from 'react';
import {DashboardBackground} from '../../assets';
import {colors} from '../../utilities';

const LoginPage = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div
            style={{
              backgroundImage: `url(${DashboardBackground})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '100vh',
              margin: 0,
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: 10,
                alignSelf: 'center',
                padding: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70%',
                height: '60%'
              }}>
              <h2 style={{margin: '10px 0'}}>Personal Calendar</h2>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
