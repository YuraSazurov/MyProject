import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ACTIONS_TYPES } from "../../store/types";
import "./_style.scss";

export const BaseSelect = ({ options, label, type }) => {
  const dispatch = useDispatch();

  const changeValue = (event) => {
    switch (type) {
      case "Month":
        changeMonth(event);
        break;
      case "Year":
        changeYear(event);
        break;
      default:
        return null;
    }
  };
  const changeMonth = (event) => {
    dispatch({ type: ACTIONS_TYPES.CHANGE_EXPIRATION_MONTH, payload: event.target.value });
  };
  const changeYear = (event) => {
    dispatch({ type: ACTIONS_TYPES.CHANGE_EXPIRATION_YEAR, payload: event.target.value });
  };

  return (
    <div className={`base-select ${!label ? "mt-4" : null}`}>
      <label className="base-select__label ">{label}</label>
      <select className="form-select" onChange={changeValue}>
        {options.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
