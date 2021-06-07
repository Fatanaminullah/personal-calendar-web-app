import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {
  eventsReducer,
  loadingReducer,
} from './reducers';

const appReducer = combineReducers({
  events: eventsReducer,
  loading: loadingReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export const configureStore = () => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['events'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
