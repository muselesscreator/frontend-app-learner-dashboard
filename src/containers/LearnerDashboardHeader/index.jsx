import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Program } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import { GreetingBanner } from './GreetingBanner';

function LearnerDashboardHeader({ intl, showUserDropdown }) {
  const { authenticatedUser } = useContext(AppContext);
  return (
    <div className='d-flex flex-column bg-primary'>
      <header className='learner-dashboard-header'>
        <div className='d-flex'>
          <Button variant="inverse-tertiary" iconBefore={Program}>Switch to program</Button>
          <div className='flex-grow-1'></div>
          {showUserDropdown && authenticatedUser && (
            <AuthenticatedUserDropdown username={authenticatedUser.username} />
          )}
          {showUserDropdown && !authenticatedUser && <AnonymousUserMenu />}
        </div>
      </header>
      <GreetingBanner />
    </div>
  );
}

LearnerDashboardHeader.propTypes = {
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearnerDashboardHeader.defaultProps = {
  showUserDropdown: true,
};

export default injectIntl(LearnerDashboardHeader);
