import React from 'react';

import CourseCard from 'containers/CourseCard';
import { courseIDs } from 'data/services/lms/fakeData/courses';

export const CourseList = () => (
  <div>
    {courseIDs.map(id => <CourseCard courseID={id} />)}
  </div>
);

export default CourseList;
