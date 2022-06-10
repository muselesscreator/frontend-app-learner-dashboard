import { Locked } from '@edx/paragon/icons';

import { selectors } from 'data/redux';

import * as appHooks from 'hooks';
import { testCardValues } from 'testUtils';
import * as hooks from './hooks';

import messages from './messages';

const courseNumber = 'my-test-course-number';
const { fieldKeys } = selectors.cardData;

const props = {
  canUpgrade: false,
  isAudit: true,
  isAuditAccessExpired: false,
  isVerified: false,
  isPending: false,
  isFinished: false,
};

describe('CourseCardActions hooks', () => {
  let out;
  const { formatMessage } = appHooks.useIntl();
  describe('data connection', () => {
    beforeEach(() => {
      out = hooks.actionHooks({ courseNumber });
    });
    testCardValues(courseNumber, {
      canUpgrade: fieldKeys.canUpgrade,
      isAudit: fieldKeys.isAudit,
      isAuditAccessExpired: fieldKeys.isAuditAccessExpired,
      isVerified: fieldKeys.isVerified,
      isPending: fieldKeys.isCourseRunPending,
      isFinished: fieldKeys.isCourseRunFinished,
    });
  });
  describe('secondary action', () => {
    it('returns null if verified', () => {
      appHooks.getCardValues.mockReturnValueOnce({
        ...props,
        isAudit: false,
        isVerified: true,
      });
      out = hooks.actionHooks({ courseNumber });
      expect(out.secondary).toEqual(null);
    });
    it('returns disabled upgrade button if audit, but cannot upgrade', () => {
      appHooks.getCardValues.mockReturnValueOnce(props);
      out = hooks.actionHooks({ courseNumber });
      expect(out.secondary).toEqual({
        iconBefore: Locked,
        variant: 'outline-primary',
        disabled: true,
        children: formatMessage(messages.upgrade),
      });
    });
    it('returns enabled upgrade button if audit and can upgrade', () => {
      appHooks.getCardValues.mockReturnValueOnce({ ...props, canUpgrade: true });
      out = hooks.actionHooks({ courseNumber });
      expect(out.secondary).toEqual({
        iconBefore: Locked,
        variant: 'outline-primary',
        disabled: false,
        children: formatMessage(messages.upgrade),
      });
    });
  });
  describe('primary action', () => {
    it('returns Begin Course button if pending', () => {
      appHooks.getCardValues.mockReturnValueOnce({ ...props, isPending: true });
      out = hooks.actionHooks({ courseNumber });
      expect(out.primary).toEqual({
        children: formatMessage(messages.beginCourse),
      });
    });
    it('returns enabled Resume button if active, and not audit with expired access', () => {
      appHooks.getCardValues.mockReturnValueOnce({ ...props, isAuditAccessExpired: true });
      out = hooks.actionHooks({ courseNumber });
      expect(out.primary).toEqual({
        children: formatMessage(messages.resume),
        disabled: true,
      });
    });
    it('returns disabled Resume button if active and audit without expired access', () => {
      appHooks.getCardValues.mockReturnValueOnce({ ...props });
      out = hooks.actionHooks({ courseNumber });
      expect(out.primary).toEqual({
        children: formatMessage(messages.resume),
        disabled: false,
      });
      appHooks.getCardValues.mockReturnValueOnce({ ...props, isAudit: false, isVerified: true });
      out = hooks.actionHooks({ courseNumber });
      expect(out.primary).toEqual({
        children: formatMessage(messages.resume),
        disabled: false,
      });
    });
    it('returns viewCourse button if finished', () => {
      appHooks.getCardValues.mockReturnValueOnce({ ...props, isFinished: true });
      out = hooks.actionHooks({ courseNumber });
      expect(out.primary).toEqual({
        children: formatMessage(messages.viewCourse),
      });
    });
  });
});
