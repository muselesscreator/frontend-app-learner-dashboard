import { StrictDict } from 'utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [],
  courseData: {},
  entitlements: [],
};

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadEnrollments: (state, { payload }) => ({
      ...state,
      enrollments: payload.map(curr => curr.courseRun.courseNumber),
      courseData: payload.reduce(
        (obj, curr) => ({
          ...obj,
          [curr.courseRun.courseNumber]: curr,
        }),
        {},
      ),
    }),
    loadEntitlements: (state, { payload }) => ({ ...state, entitlements: payload }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
