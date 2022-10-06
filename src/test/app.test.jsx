/* eslint-disable */
import React from 'react';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import {
  act,
  render,
  waitFor,
  within,
  prettyDOM,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import thunk from 'redux-thunk';
import { useIntl, IntlProvider } from '@edx/frontend-platform/i18n';

import api from 'data/services/lms/api';
import fakeData from 'data/services/lms/fakeData/courses';
import { RequestKeys, RequestStates } from 'data/constants/requests';
import reducers from 'data/redux';
import messages from 'i18n';
import { selectors } from 'data/redux';
import { cardId as genCardId } from 'data/redux/app/reducer';

import App from 'App';
import Inspector from './inspector';
import appMessages from './messages';

jest.unmock('@edx/paragon');
jest.unmock('@edx/paragon/icons');
jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('@edx/frontend-component-footer');
jest.unmock('react');
jest.unmock('react-redux');
jest.unmock('reselect');
jest.unmock('hooks');

jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  useIntl: () => ({
    formatMessage: jest.requireActual('testUtils').formatMessage,
    formatDate: (date) => `Date-${date}`,
  }),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
  getLoginRedirectUrl: jest.fn(),
}));

const configureStore = () => redux.createStore(
  reducers,
  redux.compose(redux.applyMiddleware(thunk)),
);

let el;
let store;
let state;
let retryLink;
let inspector;

/**
 * Simple wrapper for updating the top-level state variable, that also returns the new value
 * @return {obj} - current redux store state
 */
const getState = () => {
  state = store.getState();
  return state;
};

/**
 * Object to be filled with resolve/reject functions for all controlled network comm channels
 */
const resolveFns = {
};
/**
 * Mock the api with jest functions that can be tested against.
 */
const mockNetworkError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.badRequest },
}));

const mockForbiddenError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.forbidden },
}));

const mockApi = () => {
  api.initializeList = jest.fn(() => new Promise(
    (resolve, reject) => {
      resolveFns.init = {
        success: () => resolve({
          courses: [
            ...fakeData.courseRunData,
            ...fakeData.entitlementData,
          ],
          ...fakeData.globalData,
        }),
      };
    }));
};

/**
 * load and configure the store, render the element, and populate the top-level state object
 */
const renderEl = async () => {
  store = configureStore();
  el = await render(
    <IntlProvider locale='en' messages={messages.en}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>,
  );
  getState();
};

const waitForEqual = async (valFn, expected, key) => waitFor(() => {
  expect(valFn(), `${key} is expected to equal ${expected}`).toEqual(expected);
});
const waitForRequestStatus = (key, status) => waitForEqual(
  () => getState().requests[key].status,
  status,
  key,
);

describe('ESG app integration tests', () => {
  beforeEach(async () => {
    mockApi();
    await renderEl();
    inspector = new Inspector(el);
  });

  test('initialization', async () => {
    await waitForRequestStatus(RequestKeys.initialize, RequestStates.pending);
    resolveFns.init.success();
    await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
  });

  test('course cards', async () => {
    const { formatDate } = useIntl();
    resolveFns.init.success();
    await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
    await inspector.findByText(fakeData.courseRunData[0].course.courseName);
    const cards = inspector.get.courseCards;

    let cardId;
    let courseData;
    let cardDetails;
    await getState();

    // Card 1 is Audit, pending, and can upgrade
    cardId = genCardId(0);
    courseData = state.app.courseData[cardId];
    expect(courseData.enrollment.isAudit).toEqual(true);
    expect(courseData.courseRun.isStarted).toEqual(false);
    expect(courseData.enrollment.canUpgrade).toEqual(true);

    let card = cards.at(0);

    inspector.verifyText(
      inspector.get.card.header(card),
      courseData.course.courseName,
    );
    cardDetails = inspector.get.card.details(card);
    [
      courseData.courseProvider.name,
      courseData.course.courseNumber,
      appMessages.withValues.CourseCardDetails.courseStarts({
        startDate: formatDate(new Date(courseData.courseRun.startDate)),
      }),
    ].forEach(value => inspector.verifyTextIncludes(cardDetails, value));
  });
});
