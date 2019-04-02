import { factory } from 'tests/utilities';
import Country from '../index';

// Arrange
const API_URL = 'https://www.countryflags.io';
const source = {
  data: [
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'TH', name: 'Thailand' }
  ]
};

// Setup
function setup(props) {
  return factory(Country, source, props);
}

// Test suites
describe('<Country />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render country name', () => {
    const expected = { content: source.data[0].name };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.content);
  });

  it('should render country flag', () => {
    const expected = { url: `${API_URL}/${source.data[2].code}/flat/32.png` };
    const { getByAltText } = setup();

    expect(getByAltText(source.data[2].name)).toHaveAttribute(
      'src',
      expected.url
    );
  });
});
