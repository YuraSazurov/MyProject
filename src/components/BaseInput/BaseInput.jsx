import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import types from "creditcards-types";
import { ACTIONS_TYPES } from "../../store/types";
import "./_style.scss";

export const BaseInput = ({ label, value, type }) => {
  const validTypes = ["visa", "mastercard", "american", "discover"];
  const dispatch = useDispatch();
  const cardType = useSelector((state) => state.cardType);
  const backSide = useSelector((state) => state.backSide);
  const cardNumber = useSelector((state) => state.cardNumber);
  const name = useSelector((state) => state.name);
  const cvv = useSelector((state) => state.cvv);

  const getCardType = (value) => {
    const type = types.find((type) => type.test(value, true));
    if (value && type && validTypes.includes(type.name.toLowerCase())) {
      if (cardNumber.trim().split(" ").join("").length === 15) {
        dispatch({ type: ACTIONS_TYPES.SET_BTN_DISABLE, payload: false });
      }
      dispatch({ type: ACTIONS_TYPES.CHANGE_CARD_TYPE, payload: type.name.toLowerCase() });
      dispatch({
        type: ACTIONS_TYPES.SET_CARD,
        payload: `${cardType}-${backSide ? "back" : "front"}`,
      });
    } else {
      dispatch({
        type: ACTIONS_TYPES.SET_CARD,
        payload: "",
      });
      dispatch({ type: ACTIONS_TYPES.SET_BTN_DISABLE, payload: true });
    }
  };

  const changeHandler = (event) => {
    switch (type) {
      case "Number":
        changeNumber(event);
        break;
      case "Name":
        changeName(event);
        break;
      case "Cvv":
        changeCvv(event);
        break;
      default:
        return null;
    }
  };
  const changeName = (event) => {
    dispatch({ type: ACTIONS_TYPES.CHANGE_NAME, payload: event.target.value });
  };
  const changeCvv = (event) => {
    if (event.target.value.length <= 3) {
      dispatch({ type: ACTIONS_TYPES.CHANGE_CVV, payload: event.target.value });
    }
  };

  const validateCardNumber = (value) => {
    const string = value.trim().split(" ").join("");
    if (value && string.length % 4 === 0) {
      if (string.length !== 16) {
        return value + " ";
      } else return value;
    } else {
      return value;
    }
  };

  const changeNumber = (event) => {
    const value = event.target.value;

    if (
      Number.isInteger(+value.split(" ").join("")) &&
      value.trim().split(" ").join("").length !== 17
    ) {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        dispatch({
          type: ACTIONS_TYPES.CHANGE_NUMBER,
          payload: value,
        });
        getCardType("");
      } else {
        dispatch({
          type: ACTIONS_TYPES.CHANGE_NUMBER,
          payload: validateCardNumber(value),
        });
        getCardType(value);
      }
    }
  };

  const flipCard = () => {
    if (label === "CVV") {
      dispatch({ type: ACTIONS_TYPES.SET_ANIMATION, payload: "to-front-0" });
      setTimeout(() => {
        dispatch({
          type: ACTIONS_TYPES.SET_CARD,
          payload: `${cardType}-back`,
        });
      }, 500);
      setTimeout(() => {
        dispatch({ type: ACTIONS_TYPES.SET_MIRROR, payload: "mirror" });
        dispatch({ type: ACTIONS_TYPES.SET_ANIMATION, payload: "to-0-back" });
      }, 500);
    }
  };
  const returnCard = () => {
    if (label === "CVV") {
      dispatch({ type: ACTIONS_TYPES.SET_ANIMATION, payload: "to-back-0" });
      setTimeout(() => {
        dispatch({
          type: ACTIONS_TYPES.SET_CARD,
          payload: `${cardType}-front`,
        });
      }, 500);
      setTimeout(() => {
        dispatch({ type: ACTIONS_TYPES.SET_ANIMATION, payload: "to-0-front" });
        dispatch({ type: ACTIONS_TYPES.SET_MIRROR, payload: "mirror" });
      }, 500);
    }
  };

  useEffect(() => {
    if (
      !cardNumber ||
      cardNumber.split(" ").join("").length !== 16 ||
      !name ||
      !cvv ||
      cvv.length !== 3
    ) {
      dispatch({ type: ACTIONS_TYPES.SET_BTN_DISABLE, payload: true });
    } else {
      dispatch({ type: ACTIONS_TYPES.SET_BTN_DISABLE, payload: false });
    }
  }, [cardNumber, name, cvv]);

  return (
    <div className={`base-input input-group ${!label ? "mt-4" : null}`}>
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control base-input__field"
        id="basic-url"
        aria-describedby="basic-addon3"
        value={value}
        onChange={changeHandler}
        onFocus={flipCard}
        onBlur={returnCard}
      />
    </div>
  );
};
