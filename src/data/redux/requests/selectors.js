import { StrictDict } from 'utils';
import { RequestStates } from 'data/constants/requests';
// import * as module from './selectors';

export const requestStatus = (state, { requestKey }) => state.requests[requestKey];

const statusSelector = (fn) => (state, { requestKey }) => fn(state.requests[requestKey]);

export const isInactive = ({ status }) => status === RequestStates.inactive;
export const isPending = ({ status }) => status === RequestStates.pending;
export const isCompleted = ({ status }) => status === RequestStates.completed;
export const isFailed = ({ status }) => status === RequestStates.failed;
export const error = (request) => request.error;
export const errorStatus = (request) => request.error?.response?.status;
export const errorCode = (request) => request.error?.response?.data;

export const data = (request) => request.data;

export default StrictDict({
  requestStatus,
  isInactive: statusSelector(isInactive),
  isPending: statusSelector(isPending),
  isCompleted: statusSelector(isCompleted),
  isFailed: statusSelector(isFailed),
  error: statusSelector(error),
  errorCode: statusSelector(errorCode),
  errorStatus: statusSelector(errorStatus),
  data: statusSelector(data),
});
