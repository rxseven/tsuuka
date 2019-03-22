import axios from 'axios';

import { fetchCurrencies, fetchRate } from '../currency';

// Mock
jest.mock('axios');

// Test suites
describe('fetchCurrencies() service', () => {
  it('should return images when the operation completed successfully', async () => {
    const data = {};
    const response = {
      next_cursor: 'cursor',
      resources: [
        { code: 'THB', name: 'Thai Baht' },
        { code: 'USD', name: 'United States Dollar' }
      ]
    };
    const errorHandler = jest.fn();
    const successHandler = jest.fn();
    const expected = { arguments: response };
    axios.get.mockImplementation(() => Promise.resolve(response));

    await fetchCurrencies(data, successHandler, errorHandler);

    expect(successHandler).toHaveBeenCalledWith(expected.arguments);
    expect(errorHandler).not.toHaveBeenCalled();
  });

  it('should return an error message when the operation failed', async () => {
    const data = {};
    const response = new Error('Something went wrong');
    const errorHandler = jest.fn();
    const successHandler = jest.fn();
    const expected = { arguments: response };
    axios.get.mockImplementation(() => Promise.reject(response));

    await fetchCurrencies(data, successHandler, errorHandler);

    expect(errorHandler).toHaveBeenCalledWith(expected.arguments);
    expect(successHandler).not.toHaveBeenCalled();
  });
});

describe('fetchRate() service', () => {
  it('should upload images successfully', async () => {
    const data = {};
    const response = {
      countries: [{ code: 'JPY', name: 'Japanese Yen' }],
      rate: 110.76254914237391,
      timestamp: 1553240827
    };
    const errorHandler = jest.fn();
    const successHandler = jest.fn();
    const expected = { arguments: response };
    axios.get.mockImplementation(() => Promise.resolve(response));

    await fetchRate(data, successHandler, errorHandler);

    expect(successHandler).toHaveBeenCalledWith(expected.arguments);
    expect(errorHandler).not.toHaveBeenCalled();
  });

  it('should return an error message when the operation failed', async () => {
    const data = {};
    const response = new Error('Something went wrong');
    const errorHandler = jest.fn();
    const successHandler = jest.fn();
    const expected = { arguments: response };
    axios.get.mockImplementation(() => Promise.reject(response));

    await fetchRate(data, successHandler, errorHandler);

    expect(errorHandler).toHaveBeenCalledWith(expected.arguments);
    expect(successHandler).not.toHaveBeenCalled();
  });
});
