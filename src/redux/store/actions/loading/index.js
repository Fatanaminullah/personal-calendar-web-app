import {loadingTypes} from '../../action-types';

const {
  SHOW_LOADING,
  DISMISS_LOADING,
  SHOW_LOADING_TABLE,
  DISMISS_LOADING_TABLE,
  SHOW_LOADING_BUTTON,
  DISMISS_LOADING_BUTTON,
} = loadingTypes;

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

const dismissLoading = (payload) => ({
  type: DISMISS_LOADING,
  payload,
});
const showLoadingTable = (payload) => ({
  type: SHOW_LOADING_TABLE,
  payload,
});

const dismissLoadingTable = (payload) => ({
  type: DISMISS_LOADING_TABLE,
  payload,
});
const showLoadingButton = (payload) => ({
  type: SHOW_LOADING_BUTTON,
  payload,
});

const dismissLoadingButton = (payload) => ({
  type: DISMISS_LOADING_BUTTON,
  payload,
});

export {
  showLoading,
  dismissLoading,
  showLoadingTable,
  dismissLoadingTable,
  showLoadingButton,
  dismissLoadingButton,
};
