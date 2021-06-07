import {eventActionTypes} from '../../action-types';

const {SET_EVENTS} = eventActionTypes;

const setEventsData = (payload) => ({
  type: SET_EVENTS,
  payload,
});

export {setEventsData};
