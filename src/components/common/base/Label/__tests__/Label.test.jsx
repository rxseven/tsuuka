import { factory } from 'tests/utilities';
import Label from '../index';

// Arrange
const seed = { content: 'content' };
const source = {
  children: seed.content,
  htmlFor: 'email'
};
const input = { ...seed, ...source };

// Setup
function setup(props) {
  return factory(Label, source, props);
}

// Test suites
describe('<Label />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render passed children correctly', () => {
    const expected = { content: input.content };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.content);
  });
});
