import {loadingTypes} from '../../action-types';

const {
  SHOW_LOADING,
  DISMISS_LOADING,
  SHOW_LOADING_TABLE,
  DISMISS_LOADING_TABLE,
  SHOW_LOADING_BUTTON,
  DISMISS_LOADING_BUTTON,
} = loadingTypes;

const initialState = {
  loading: false,
  loadingTable: false,
  loadingButton: false,
};

const reducer = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SHOW_LOADING:
      return {...state, loading: true};
    case DISMISS_LOADING:
      return {...state, loading: false};
    case SHOW_LOADING_TABLE:
      return {...state, loadingTable: true};
    case DISMISS_LOADING_TABLE:
      return {...state, loadingTable: false};
    case SHOW_LOADING_BUTTON:
      return {...state, loadingButton: true};
    case DISMISS_LOADING_BUTTON:
      return {...state, loadingButton: false};
    default:
      return state;
  }
};

export default reducer;
