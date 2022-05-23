import React from 'react';

import CourseListCard from 'containers/CourseListCard';
import { courseIDs } from 'data/services/lms/fakeData/courses';

export const CourseList = () => (
  <div>
    <h1>CourseList</h1>
    {courseIDs.map(id => <CourseListCard courseID={id} />)}
  </div>
);

export default CourseList;
