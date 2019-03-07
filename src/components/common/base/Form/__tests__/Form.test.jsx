import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Form from '../index';

describe('<Form />', () => {
  // Arrange
  const props = { children: <div>Form controls</div> };
  const component = <Form {...props} />;

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
