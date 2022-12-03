import React, { useEffect, useRef, useState } from "react";

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
  return (
    <div ref={listGroupRef} className="list-group autocomplete">
      {props.items.map((item: any) => (
        <a key={item.id} className="list-group-item list-group-item-action">
          {item.name}
        </a>
      ))}

      {/* <a href="#" className="list-group-item list-group-item-action active">
        Teste 01
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Teste 02
      </a> */}
    </div>
  );
};

const AutocompleteComponent = (props: any) => {
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showAutoCompleteBefore, setShowAutoCompleteBefore] = useState(false);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const emitValueHandler = (value: string) => {
    props.setValue(value);
  };

  function showAutoCompleteList() {
    const rect = autoCompleteRef.current!.getBoundingClientRect();

    const inputValue = autoCompleteRef.current!.value;
    emitValueHandler(inputValue);

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
    console.log(inputValue);
  }

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
        />
        {showAutoComplete && (
          <AutoCompleteList
            show={showAutoComplete}
            showBefore={showAutoCompleteBefore}
            items={props.items}
            position="after"
            startPosition="bottom"
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default AutocompleteComponent;
