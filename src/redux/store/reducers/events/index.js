import moment from 'moment';
import {eventActionTypes} from '../../action-types';

const {SET_EVENTS} = eventActionTypes;

const setInitEvents = () => {
  let days = {};
  for (let k = 1; k <= moment().daysInMonth(); k++) {
    days = {
      ...days,
      [k]: [],
    };
  }
  return days;
};

const initialState = {
  events: setInitEvents(),
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_EVENTS:
      return {...state, events: payload};
    default:
      return state;
  }
};

export default reducer;
