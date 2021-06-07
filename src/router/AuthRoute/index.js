import React from 'react';
import {Route} from 'react-router-dom';
import {TitleComponent} from '../../components';

export const AuthRoute = ({component, layout: Layout, ...rest}) => {
  return (
    <div>
      <TitleComponent title={rest.title} />
      <Route
        {...rest}
        exact
        render={(props) => {
          if (Layout) {
            return <Layout>{React.createElement(component, props)}</Layout>;
          }
          return React.createElement(component, props);
        }}
      />
    </div>
  );
};
