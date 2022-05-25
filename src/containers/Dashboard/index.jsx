import React from 'react';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import { courseIDs } from 'data/services/lms/fakeData/courses';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import EmptyCourse from '../EmptyCourse';

import messages from './messages';

export const Dashboard = () => (
  <div className="d-flex flex-column p-2">
    {courseIDs.length ? (
      <>
        <h2 className="py-2">
          <FormattedMessage {...messages.myCourse} />
        </h2>
        <div className="d-flex">
          <CourseList courseIDs={courseIDs} />
          <WidgetSidebar />
        </div>
      </>
    ) : (
      <EmptyCourse />
    )}
  </div>
);

export default Dashboard;