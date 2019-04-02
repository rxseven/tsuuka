import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import Autosuggest from 'react-autosuggest';

import './Combobox.styles.scss';

// Regex
function escapeCharacters(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Filter list
// Re-run the filter whenever the list array, keys or filter text changes
const filterList = memoize((list, keys, term) => {
  return list.filter(item =>
    keys.some(key =>
      String(item[key])
        .toLowerCase()
        .includes(term.toLowerCase())
    )
  );
});

// Calculate suggestions for any given input value
function getSuggestions(data, value) {
  // Format input value
  const escapedValue = escapeCharacters(value.trim());

  // Return an empty list if the input value is not defined
  if (escapedValue === '') {
    return [];
  }

  // Return matched suggestions
  // Calculate the latest filtered list. If these arguments haven't changed
  // since the last render, memoized function will reuse the last return value.
  return filterList(data, ['code', 'name'], escapedValue);
}

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  display: PropTypes.func.isRequired,
  dropdown: PropTypes.instanceOf(Function).isRequired,
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  input: PropTypes.instanceOf(Object).isRequired,
  onReset: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  override: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string
};

const defaultProps = {
  initialValue: '',
  override: false,
  value: ''
};

// Component
class Combobox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      value: props.initialValue
    };
  }

  componentDidUpdate() {
    const { value } = this.state;

    // Reset form is neccessary
    this.handleReset(value);
  }

  static getDerivedStateFromProps(props, state) {
    // Force updating state controlled by the parent component
    if (props.override) {
      return { value: props.value };
    }

    return null;
  }

  // Render suggestion list (dropdown)
  // Define how suggestions are rendered
  renderSuggestion = (suggestion, { query }) => {
    const { dropdown: Dropdown } = this.props;

    return <Dropdown data={suggestion} query={query} />;
  };

  // Render input component
  renderInput = props => {
    const { input: Input } = this.props;

    return <Input {...props} />;
  };

  // Update input value and reset form is neccessary
  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue }, () => this.handleReset(newValue));
  };

  // Clear input value and reset form is neccessary
  handleClear = () => {
    this.setState({ value: '' }, () => this.handleReset());
  };

  // Reset form
  handleReset = (value = '') => {
    if (!value) {
      const { onReset } = this.props;
      onReset();
    }
  };

  // Set a selection when suggestion is selected via mouse or keyboard
  handleSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    const { onSelect } = this.props;

    onSelect(suggestion);
  };

  // Update suggestion list
  // This function will be called every time, it might need to update suggestions
  handleSuggestionsFetchRequested = ({ value }) => {
    const { data } = this.props;

    this.setState({ suggestions: getSuggestions(data, value) });
  };

  // Clear suggestion list
  // This function will be called every time, it needs to clear suggestions
  handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  // Display suggestions only when input value is at least 2 characters long
  // By default, suggestions are rendered when the input isn't blank
  handleRenderSuggestions = value => value.trim().length > 1;

  render() {
    const { display, id, placeholder } = this.props;
    const { suggestions, value } = this.state;

    const inputProps = {
      onChange: this.handleChange,
      onClear: this.handleClear,
      id,
      placeholder,
      value
    };

    return (
      <Autosuggest
        focusInputOnSuggestionClick={false}
        getSuggestionValue={display}
        highlightFirstSuggestion={false}
        id={id}
        inputProps={inputProps}
        onSuggestionSelected={this.handleSuggestionSelected}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderInputComponent={this.renderInput}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.handleRenderSuggestions}
        suggestions={suggestions}
      />
    );
  }
}

Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export { filterList, getSuggestions };
export default Combobox;
