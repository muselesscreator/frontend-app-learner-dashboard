import React from 'react';

import CourseCard from 'containers/CourseCard';

export const CourseList = ({ courseIDs }) => (
  <div>
    {courseIDs.map((id) => (
      <CourseCard courseID={id} />
    ))}
  </div>
);

export default CourseList;
