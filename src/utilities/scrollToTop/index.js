import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';

const ScrollToTopFunc = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);
  return props.children;
}

export const ScrollToTop = withRouter(ScrollToTopFunc)
