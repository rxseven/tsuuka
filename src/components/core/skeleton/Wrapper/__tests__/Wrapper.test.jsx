import React from 'react';

import { factory, toMarkup } from 'tests/utilities';
import Wrapper from '../index';

// Arrange
const seed = { content: 'content' };
const source = { children: <span>{seed.content}</span> };
const input = { ...seed, ...source };

// Setup
function setup(props) {
  return factory(Wrapper, source, props);
}

// Test suites
describe('<Wrapper />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render passed children correctly', () => {
    const expected = {
      content: input.content,
      html: input.children
    };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.content);
    expect(component).toContainHTML(toMarkup(expected.html));
  });
});
