import React from 'react';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import { courseIDs } from 'data/services/lms/fakeData/courses';
import EmptyCourse from '../EmptyCourse';

export const Dashboard = () => {
  return (
    <div className='d-flex'>
      {courseIDs.length ? (
        <>
          <CourseList courseIDs={courseIDs} />
          <WidgetSidebar />
        </>
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default Dashboard;
