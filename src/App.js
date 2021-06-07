import Router from './router';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {configureStore} from './redux/store';
import './utilities/translations/i18n';
import 'antd/dist/antd.css';
import './styles/layout.css';

export const store = configureStore().store;
const persistor = configureStore().persistor;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
