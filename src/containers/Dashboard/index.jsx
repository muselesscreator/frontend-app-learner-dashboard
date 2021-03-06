import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

import { selectors, thunkActions } from 'data/redux';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import EmptyCourse from 'containers/EmptyCourse';

import messages from './messages';
import * as module from '.';

export const useDashboardData = ({ dispatch }) => {
  React.useEffect(
    () => { dispatch(thunkActions.app.initialize()); },
    [dispatch],
  );
  return {
    enrollments: useSelector(selectors.app.enrollments),
    entitlements: useSelector(selectors.app.entitlements),
  };
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    enrollments,
    // entitlements,
  } = module.useDashboardData({ dispatch });
  return (
    <div className="d-flex flex-column p-2">
      {enrollments.length ? (
        <>
          <h2 className="py-2">
            <FormattedMessage {...messages.myCourse} />
          </h2>
          <div className="d-flex">
            <CourseList courseListData={enrollments} />
            <WidgetSidebar />
          </div>
        </>
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default Dashboard;
