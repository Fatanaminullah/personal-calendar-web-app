import {eventActionTypes} from '../../action-types';

const {SET_EVENTS} = eventActionTypes;

const initialState = {
  events: [],
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
