import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Program, Locked, MoreVert } from '@edx/paragon/icons';
import { Button, Card } from '@edx/paragon';
import { RelatedProgram } from './RelatedProgram';
import { CourseCardMenu } from './CourseCardMenu';
import { CourseCardFooter } from './CourseCardFooter';

function CourseCard() {
  return (
    <div>
      <Card orientation='horizontal'>
        <Card.ImageCap
          src='https://source.unsplash.com/360x200/?nature,flower'
          srcAlt='Card image'
          // logoSrc='https://via.placeholder.com/150'
          // logoAlt='Card logo'
        />
        <Card.Body>
          <Card.Header
            title='Title'
            actions={<CourseCardMenu />}
          />
          <Card.Section>
            This is a special case where we want to have Footer with vertical
            orientation in the Card with horizontal orientation.
          </Card.Section>
          <Card.Footer orientation='vertical' textElement={<RelatedProgram />}>
            <Button iconBefore={Locked} variant='outline-primary'>
              Upgrade
            </Button>
            <Button>Resume</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CourseCardFooter />
    </div>
  );
}

CourseCard.propTypes = {
  // intl: intlShape.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;

// export default injectIntl(CourseCard);
