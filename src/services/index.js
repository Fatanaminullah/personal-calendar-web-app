import {message} from 'antd';
import axios from 'axios';
import {store} from '../App';
import {DISMISS_LOADING} from '../redux/store/action-types/loading';
import {getBalance} from '../redux/store/actions/dashboard';

const forceDismissLoading = () => ({
  type: DISMISS_LOADING,
});

const clearStore = () => ({
  type: 'USER_LOGGED_OUT',
});

const forceLogout = async (msg) => {
  store.dispatch(forceDismissLoading());
  store.dispatch(clearStore());
  message.error(msg);
};

const renderHeaders = async (uploadFile) => {
  const token = store.getState().auth.authData?.token;
  if (token) {
    return {
      'Content-Type': uploadFile ? 'multipart/form-data' : 'application/json',
      Authorization: token,
    };
  }
  return {
    'Content-Type': uploadFile ? 'multipart/form-data' : 'application/json',
  };
};

const Get = async (path, request, responseType) => {
  const req = [];
  if (request) {
    Object.keys(request).forEach((item, index) => {
      req.push(`${[item]}=${request[item]}`);
    });
  }
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      baseURL: `${process.env.REACT_APP_API_URL}`,
      url: `${path}?${req.join('&') || ''}`,
      headers,
      responseType,
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
        if (err?.response?.status === 401) {
          forceLogout(err?.response?.data?.message || err.message);
        }
      },
    );
  });
  return promise;
};

const Post = async (path, request, uploadFile) => {
  const headers = await renderHeaders(uploadFile);
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      baseURL: `${process.env.REACT_APP_API_URL}`,
      url: `${path}`,
      data: request,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        if (err?.response?.status === 401) {
          forceLogout(err?.response?.data?.message || err.message);
        }
      });
  });
  return promise;
};

const Put = async (path, request) => {
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'put',
      baseURL: `${process.env.REACT_APP_API_URL}`,
      url: `${path}`,
      data: request,
      headers,
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
        if (err?.response?.status === 401) {
          forceLogout(err?.response?.data?.message || err.message);
        }
      },
    );
  });
  return promise;
};

const Delete = async (path, request) => {
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      baseURL: `${process.env.REACT_APP_API_URL}`,
      url: `${path}`,
      data: request,
      headers,
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
        if (err?.response?.status === 401) {
          forceLogout(err?.response?.data?.message || err.message);
        }
      },
    );
  });
  return promise;
};

const Services = {
  Get,
  Post,
  Put,
  Delete,
};

export default Services;
