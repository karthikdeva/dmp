import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";

const SearchBox = param => {
  const { placeholder } = param;
  const onSearch = value => {
    let searchValue = debounce(() => {
      param.onInput(value);
    }, 500);
    searchValue();
  };
  
  let timeoutID = "";
  const debounce = (fn, delay = 300) => {
    return (...args) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn.apply(null, ...args);
      }, delay);
    };
  };
  useEffect(() => {}, [param]);

  return (
    <span className="p-input-icon-left">
      <i className="fas fa-search" />
      <InputText
        type="search"
        onInput={event => onSearch(event.target.value)}
        placeholder={placeholder}
      />
    </span>
  );
};

export default SearchBox;
