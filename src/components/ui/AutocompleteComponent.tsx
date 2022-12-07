import React, { useEffect, useRef, useState } from "react";
import SpinnerComponent from "./SpinnerComponent";

const AutoCompleteList = (props: any) => {
  const listGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.show) {
      listGroupRef.current?.classList.add("show-autocomplete");
    }

    if (props.showBefore) {
      listGroupRef.current?.classList.add("show-autocomplete-before");
    }
  }, [props.show, props.showBefore, props.items]);

  function setSelectedItemHandler(item: any) {
    console.log("Selected Item: ", item);
    props.selectItem(item);
  }
  return (
    <React.Fragment>
      {props.items && props.items.length > 0 && (
        <div ref={listGroupRef} className="list-group autocomplete">
          {props.items.map((item: any) => (
            <a
              key={item.id}
              className="list-group-item list-group-item-action"
              onClick={setSelectedItemHandler.bind(this, item)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
      {(!props.items || props.items.length === 0) && (
        <div className="spinner-wrapper">
          <SpinnerComponent />
        </div>
      )}
    </React.Fragment>
  );
};

const AutocompleteComponent = (props: any) => {
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showAutoCompleteBefore, setShowAutoCompleteBefore] = useState(false);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const emitValueHandler = (value: string) => {
    props.setValue(value);
  };

  function showAutoCompleteList() {
    const rect = autoCompleteRef.current!.getBoundingClientRect();

    const inputValue = autoCompleteRef.current!.value;
    emitValueHandler(inputValue);
    setInputValue(inputValue);

    if (inputValue.length >= 3) {
      console.log("Rect Bottom: ", rect.bottom);
      console.log("Window innerHeight", window.innerHeight);
      if (
        rect.bottom + 150 >
        (window.innerHeight || document.documentElement.clientHeight)
      ) {
        console.log("Showing before");
        setShowAutoCompleteBefore(true);
      } else {
        setShowAutoCompleteBefore(false);
      }

      setShowAutoComplete(true);
    } else {
      setShowAutoComplete(false);
    }
    //console.log(inputValue);
  }

  const setSelectedItem = (item: any) => {
    emitValueHandler(item.name);
    setInputValue(item.name);
    props.selectItem(item.id);
    setShowAutoComplete(false);
  };

  useEffect(() => {}, [props.items]);

  useEffect(() => {
    if (props.initialValue) {
      setInputValue(props.initialValue);
    }
  }, [props.initialValue]);
  return (
    <React.Fragment>
      <div className="position-relative autocomplete-input-wrapper">
        <input
          type="text"
          className="form-control"
          autoComplete="off"
          id="parentCategory"
          placeholder="Tecnologia da Informação"
          onChange={showAutoCompleteList}
          ref={autoCompleteRef}
          value={inputValue}
        />
        {showAutoComplete && (
          <AutoCompleteList
            show={showAutoComplete}
            showBefore={showAutoCompleteBefore}
            items={props.items}
            position="after"
            startPosition="bottom"
            selectItem={setSelectedItem}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default AutocompleteComponent;
