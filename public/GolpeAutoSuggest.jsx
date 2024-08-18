import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { golpes } from './golpes';

export function GolpeAutosuggest({ onAddGolpe }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const input = inputValue.trim().toLowerCase();
    return golpes.filter(golpe =>
      golpe.toLowerCase().includes(input)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    onAddGolpe(suggestion);
    setValue(''); // Limpiar el input después de seleccionar un golpe
  };

  const theme = {
    container: {
      position: 'relative',
      width: '100%',
    },
    input: {
      width: '100%',
      height: '100%',
      padding: '10px 20px',
      fontFamily: 'inherit',
      fontSize: '1rem',
      border: value ? '1px solid #ccc' : '1px solid #000',
      borderRadius: '10px',
    },
    suggestionsContainer: {
      display: suggestions.length > 0 ? 'block' : 'none',
      position: 'absolute',
      top: '100%',
      width: '100%',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      borderRadius: '4px',
      zIndex: 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    suggestion: {
      padding: '10px 20px',
      cursor: 'pointer',
    },
    suggestionHighlighted: {
      backgroundColor: '#f1f1f1',
    },
  };

  const inputProps = {
    placeholder: 'Selecciona un golpe...',
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <span>{suggestion}</span>}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
      theme={theme}
    />
  );
}
