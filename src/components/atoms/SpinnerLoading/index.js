import {Spin} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import '../../../styles/spinner.css';

const SpinnerLoading = ({children, ...props}) => {
  const {loading} = useSelector((state) => state.loading);
  return (
    <Spin size="medium" spinning={loading}>
      {children}
    </Spin>
  );
};

export default SpinnerLoading;
