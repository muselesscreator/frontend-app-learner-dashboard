import React from 'react';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <CourseList />
      <WidgetSidebar />
    </div>
  );
};

export default Dashboard;
