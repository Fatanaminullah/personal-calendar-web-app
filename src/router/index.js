import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Redirect, Router, Switch} from 'react-router-dom';
import {ScrollToTop, history} from '../utilities';
import {AuthRoute} from './AuthRoute';
import {routeSources} from './RouteSources';
import {RouteWrapper} from './RouteWrapper';

const RouterConfig = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          {routeSources.map((item) => {
            if (item?.child?.length) {
              return item.child.map((childItem) => {
                return (
                  <RouteWrapper
                    key={item?.key}
                    path={`${item?.path}${childItem?.path}`}
                    exact={childItem?.exact}
                    component={childItem?.component}
                    private={childItem?.private}
                    layout={item.layout}
                    title={childItem.title}
                  />
                );
              });
            }
            return (
              <AuthRoute
                key={item?.key}
                path={item?.path}
                private={item?.private}
                exact={item?.exact}
                component={item?.component}
                title={item.title}
              />
            );
          })}
          <Redirect to="/404-not-found" />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default RouterConfig;
