import {LeftCircleFilled, PlusCircleOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';
import React from 'react';
import {Button} from '../../../components';
import {history} from '../../../utilities';

const PageTitle = ({
  title,
  showButtonAdd,
  buttonAddText,
  buttonAddPages,
  showBackButton,
}) => {
  return (
    <Row style={{marginBottom: 20}}>
      <Col
        span={18}
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {showBackButton && (
          <LeftCircleFilled
            style={{fontSize: 30, marginRight: 10}}
            onClick={() => history.goBack()}
          />
        )}
        <h1 className="header-title">{title}</h1>
      </Col>
      {showButtonAdd && (
        <Col span={6}>
          <Row justify="end">
            <Button
              onClick={() =>
                history.push({
                  pathname: buttonAddPages?.page,
                  state: buttonAddPages?.params,
                })
              }
              text={buttonAddText}
              type="secondary"
              icon={<PlusCircleOutlined />}
            />
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default PageTitle;
