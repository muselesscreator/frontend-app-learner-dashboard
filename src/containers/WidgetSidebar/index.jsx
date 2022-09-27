import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Hyperlink, Card } from '@edx/paragon';

import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';

import messages from './messages';

import './index.scss';

export const WidgetSidebar = () => (
  <div className="widget-sidebar px-2 mt-5 pt-3">
    <div className="d-flex">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={moreCoursesSVG}
          srcAlt="course side widget"
        />
        <Card.Body className="m-auto pr-2">
          <h4>
            <FormattedMessage {...messages.lookingForChallengePrompt} />
          </h4>
          <Hyperlink variant="brand" destination="#">
            <FormattedMessage {...messages.findCoursesButton} />
          </Hyperlink>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default WidgetSidebar;
