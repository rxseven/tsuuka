import { factory } from 'tests/utilities';
import Input from '../index';

// Arrange
const source = { onChange: jest.fn() };

// Setup
function setup(props) {
  return factory(Input, source, props);
}

// Test suites
describe('<Input />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render "text" input by default', () => {
    const expected = { type: 'text' };
    const { component } = setup();

    expect(component).toHaveAttribute('type', expected.type);
  });

  it('should render "password" input', () => {
    const props = { type: 'password' };
    const expected = { ...props };
    const { component } = setup(props);

    expect(component).toHaveAttribute('type', expected.type);
  });

  it('should render with passed value', () => {
    const props = { value: 'content' };
    const expected = { ...props };
    const { component } = setup(props);

    expect(component).toHaveAttribute('value', expected.value);
  });

  it('should render input tag with custom class names', () => {
    const props = { className: 'custom-class' };
    const expected = { class: props.className };
    const { component } = setup(props);

    expect(component).toHaveClass(expected.class);
  });

  it('should call validator() with value when passed', () => {
    const props = {
      validator: jest.fn(),
      value: 'content'
    };
    const expected = { arguments: props.value };
    setup(props);

    expect(props.validator).toHaveBeenLastCalledWith(expected.arguments);
  });

  it('should render an "invalid" style when passd value is invalid', () => {
    const props = {
      validator: value => value > 0,
      value: -1
    };
    const expected = { class: 'is-invalid' };
    const { component } = setup(props);

    expect(component).toHaveClass(expected.class);
  });
});
