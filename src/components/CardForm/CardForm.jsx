import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import "./_style.scss";
import { BankCard } from "../BankCard/BankCard";
import { BaseInput } from "../BaseInput/BaseInput";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { BaseLoader } from "../BaseLoader/BaseLoader";
import { ACTIONS_TYPES } from "../../store/types";

export const CardForm = () => {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.cardNumber);
  const name = useSelector((state) => state.name);
  const cvv = useSelector((state) => state.cvv);
  const expirationMonth = useSelector((state) => state.expirationMonth);
  const expirationYear = useSelector((state) => state.expirationYear);

  const cardData = useSelector((state) => state.cardData);
  const cardType = useSelector((state) => state.cardType);

  const card = useSelector((state) => state.card);
  const btnDisable = useSelector((state) => state.btnDisable);

  const [optionsMonth, setOptionsMonth] = useState([]);
  const [optionsYears, setOptionsYears] = useState([]);

  const getMonths = () => {
    let options = [];
    for (let i = 1; i <= 12; i++) {
      options.push(i);
    }
    setOptionsMonth(options);
  };
  const getYears = () => {
    let options = [];
    const currentYear = moment().year();
    for (let i = currentYear - 3; i <= currentYear + 4; i++) {
      options.push(i);
    }
    setOptionsYears(options);
  };
  const generateCardBody = () => {
    return {
      number,
      name,
      month: expirationMonth,
      year: expirationYear,
      cvv,
    };
  };

  const updateData = () => {
    dispatch({ type: ACTIONS_TYPES.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS_TYPES.SET_CARD_DATA, payload: generateCardBody() });
    setTimeout(() => {
      dispatch({ type: ACTIONS_TYPES.SET_LOADING, payload: false });
    }, 3000);
  };

  useEffect(() => {
    getMonths();
    getYears();
  }, []);

  return (
    <div className="card-form">
      <BankCard type={card} cardData={cardData} />
      <div className="card-form__fileds">
        <div className="card-form__form-group">
          <BaseInput label="Card Number" value={number} type="Number" />
          <BaseInput label="Card Name" type="Name" value={name} />
        </div>
        <div className="card-form__form-group">
          <BaseSelect
            label="Expiration time"
            options={optionsMonth}
            type="Month"
            value={expirationMonth}
          />
          <BaseSelect options={optionsYears} type="Year" value={expirationYear} />
          <BaseInput label="CVV" type="Cvv" value={cvv} />
        </div>

        <div className="d-grid gap-2">
          <button
            disabled={btnDisable}
            className="card-form__btn btn"
            type="button"
            onClick={updateData}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
