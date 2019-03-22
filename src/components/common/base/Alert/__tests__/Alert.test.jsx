import React from 'react';
import { fireEvent } from 'react-testing-library';

import { factory, toMarkup } from 'tests/utilities';
import Alert from '../index';

// Arrange
const seed = { content: 'content' };
const source = { children: <span>{seed.content}</span> };
const input = { ...seed, ...source };

// Setup
function setup(props) {
  return factory(Alert, source, props);
}

// Test suites
describe('<Alert />', () => {
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

  it('should render "danger" style by default', () => {
    const expected = { class: 'alert-danger' };
    const { component } = setup();

    expect(component).toHaveClass(expected.class);
  });

  it('should render "info" style', () => {
    const props = { look: 'info' };
    const expected = { class: `alert-${props.look}` };
    const { component } = setup(props);

    expect(component).toHaveClass(expected.class);
  });

  it('should render a close button when passed onDismiss()', () => {
    const props = { onDismiss: jest.fn() };
    const { queryByText } = setup(props);

    expect(queryByText('×')).not.toBeNull();
  });

  it('should call onDismiss() when the close button is clicked', () => {
    const props = { onDismiss: jest.fn() };
    const expected = { called: input.children };
    const { getByText } = setup(props);

    fireEvent.click(getByText('×'));

    expect(props.onDismiss).toHaveBeenCalledWith(expected.called);
  });
});
