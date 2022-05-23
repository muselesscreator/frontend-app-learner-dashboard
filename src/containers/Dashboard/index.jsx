import React from 'react';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';

export const Dashboard = () => {
  return (
    <div className='d-flex'>
      <CourseList />
      <WidgetSidebar />
    </div>
  );
};

export default Dashboard;
