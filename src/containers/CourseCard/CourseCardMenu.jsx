import React from 'react';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

export const CourseCardMenu = () => (
  <Dropdown>
    <Dropdown.Toggle
      id='dropdown-toggle-with-iconbutton'
      as={IconButton}
      src={MoreVert}
      iconAs={Icon}
      variant='primary'
      alt='Actions dropdown'
    />
    <Dropdown.Menu>
      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
