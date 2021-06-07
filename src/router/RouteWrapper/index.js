import React from 'react';
import {AuthRoute} from '../AuthRoute';

export const RouteWrapper = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return <AuthRoute {...rest} component={Component} layout={Layout} />;
};
