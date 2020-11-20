import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = ({ target }) => {
      if (ref.current && ref.current.contains(target)) {
        return;
      }
      setOpen(false);
    };
    // Create event listener on body to close dropdown on click outside of element
    document.body.addEventListener("click", onBodyClick, {
      capture: true,
    });

    return () => {
      // Cleanup function to remove event listener
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options
    .filter((option) => option.value !== selected.value)
    .map((option) => {
      return (
        <div
          onClick={() => {
            onSelectedChange(option);
          }}
          key={option.value}
          className="item"
        >
          {option.label}
        </div>
      );
    });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label>{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={classNames("ui selection dropdown", {
            "visible active": open,
          })}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div
            className={classNames("menu", {
              "visible transition": open,
            })}
          >
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
