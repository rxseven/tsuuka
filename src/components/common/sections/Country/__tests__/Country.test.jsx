import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Country from '../index';

describe('<Country />', () => {
  // Arrange
  const props = {
    data: [
      { code: 'ES', name: 'Spain' },
      { code: 'IT', name: 'Italy' },
      { code: 'TH', name: 'Thailand' }
    ]
  };
  const component = <Country {...props} />;

  describe('Unit tests', () => {
    it('should render without crashing', () => {
      // Act
      const wrapper = shallow(component);

      // Assert
      expect(wrapper).toBeDefined();
    });
  });

  describe('Snapshot tests', () => {
    it('should render correctly', () => {
      // Act
      const tree = renderer.create(component).toJSON();

      // Assert
      expect(tree).toMatchSnapshot();
    });
  });
});
