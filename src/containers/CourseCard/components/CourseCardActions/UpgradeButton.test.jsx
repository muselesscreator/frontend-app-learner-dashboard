import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import UpgradeButton from './UpgradeButton';

jest.mock('data/redux', () => ({
  hooks: {
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(() => ({ canUpgrade: true })),
  },
}));

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const upgradeUrl = 'upgradeUrl';
  hooks.useCardCourseRunData.mockReturnValue({ upgradeUrl });
  describe('snapshot', () => {
    test('can upgrade', () => {
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
    });
    test('no upgrade url', () => {
      hooks.useCardCourseRunData.mockReturnValueOnce({});
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.isEmptyRender()).toEqual(true);
    });
    test('cannot upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: false });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
    test('masquerading', () => {
      hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
