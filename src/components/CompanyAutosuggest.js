import React from 'react';
import Autosuggest from 'react-autosuggest';
import suggestions from './companyJson';
import { addCompanyInCategory } from '../actions/network';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    marginTop: '1rem',
    width: '100%',
    height: 30,
    padding: '2rem 1rem',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '2rem',
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 81,
    width: '100%',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
    boxShadow: '0px 3px 21px 0px rgba(0,0,0,0.58)'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return suggestions.filter(company => regex.test(company.company));
}

function renderSuggestion(suggestion) {
  return (
    <div>
      <div>{suggestion.company}</div>
      <a href={suggestion.url}>{suggestion.url}</a>
      <div>{suggestion.short_descrip}</div>
    </div>
  );
}

class CompanyAutosuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestionValue = (suggestion, dispatch, category) => {
    console.log(suggestion);
    dispatch(addCompanyInCategory(suggestion.company, category));
    return suggestion.company;
  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { dispatch, category } = this.props;
    const inputProps = {
      placeholder: "",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions.slice(0, 5)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => this.getSuggestionValue(suggestion, dispatch, category)}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    );
  }
}

export default CompanyAutosuggest;
