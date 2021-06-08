import {useEffect, useRef} from 'react';
import Moment from 'moment';
import history from './history';

const thousandSeparator = (number, prefix) => {
  var item = number.toString().split('.');
  item[0] = item[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${prefix || ''} ${item.join('.')}`;
};
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const isEmptyObject = (obj) => {
  return !Object.keys(obj)?.length;
};

const compare = (a, b, params, type) => {
  switch (type) {
    case 'string':
      var va = !a[params] ? '' : '' + a[params].toLowerCase();
      var vb = !b[params] ? '' : '' + b[params].toLowerCase();
      return va > vb ? 1 : va === vb ? 0 : -1;
    case 'number':
      return a[params] - b[params];
    case 'date':
      return Moment(a[params]).unix() - Moment(b[params]).unix();
    default:
      var x = !a[params] ? '' : '' + a[params].toLowerCase();
      var y = !b[params] ? '' : '' + b[params].toLowerCase();
      return x > y ? 1 : x === y ? 0 : -1;
  }
};

const removeFirstZero = (number) => {
  return number?.toString().replace(/\b0+/g, '');
};
const phoneNumberNormalize = (number) => {
  if (number.substring(0, 3) === '+62') {
    return number.replace('+62', '');
  } else {
    return removeFirstZero(number);
  }
};

const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


export {
  thousandSeparator,
  history,
  usePrevious,
  isEmptyObject,
  compare,
  removeFirstZero,
  phoneNumberNormalize,
  generateRandomColor,
};
