import React from 'react';
import {colors} from '../../../utilities';

const Container = ({children}) => {
  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 30,
        boxShadow: '-10px 10px 10px -10px rgba(0,0,0,0.25)',
      }}>
      {children}
    </div>
  );
};

export default Container;
