/* eslint-disable quotes */
import { StrictDict } from 'utils';

export const messages = StrictDict({
  header: {
    id: 'learner-dash.emailSettings.header',
    description: 'Header for email settings modal',
    defaultMessage: 'Receive course emails?',
  },
  emailsOff: {
    id: 'learner-dash.emailSettings.emailsOff',
    description: 'Toggle text for email settings modal when email is disabled',
    defaultMessage: 'Course emails are off',
  },
  emailsOn: {
    id: 'learner-dash.emailSettings.emailsOn',
    description: 'Toggle text for email settings modal when email is enabled',
    defaultMessage: 'Course emails are on',
  },
  description: {
    id: 'learner-dash.emailSettings.description',
    description: 'Description for email settings modal',
    defaultMessage: 'Course emailsi include important information about your course.',
  },
  nevermind: {
    id: 'learner-dash.emailSettings.nevermind',
    description: 'Cancel action for email settings modal',
    defaultMessage: 'Nevermind',
  },
  save: {
    id: 'learner-dash.emailSettings.save',
    description: 'Save action for email settings modal',
    defaultMessage: 'Save settings',
  },

});

export default messages;
