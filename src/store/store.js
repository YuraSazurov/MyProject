import { ACTIONS_TYPES } from "./types";
import moment from "moment";
const getMonths = () => {
  const month = moment().month("January").format("M")
  debugger
  return month;
};
const getYears = () => {
  const year =  moment().year() - 3;
  return year
};

const initialState = {
  cardNumber: "",
  expirationMonth: getMonths(),
  expirationYear: getYears(),
  name: '',
  cvv: '',

  cardType: "",
  card: "",
  backSide: false,
  animation: "",
  mirror: "",

  loading: false,
  btnDisable: true,

  cardData: {
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: ""
  }
};

export const store = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.CHANGE_NUMBER: return {...state, cardNumber: action.payload}
    case ACTIONS_TYPES.CHANGE_NAME: return {...state, name: action.payload}
    case ACTIONS_TYPES.CHANGE_EXPIRATION_MONTH: return {...state, expirationMonth: action.payload}
    case ACTIONS_TYPES.CHANGE_EXPIRATION_YEAR: return {...state, expirationYear: action.payload}
    case ACTIONS_TYPES.CHANGE_CVV: return {...state, cvv: action.payload}
    case ACTIONS_TYPES.SET_CARD_DATA: return {...state, cardData: action.payload}

    case ACTIONS_TYPES.CHANGE_CARD_TYPE: return {...state, cardType: action.payload}
    case ACTIONS_TYPES.SET_CARD: return {...state, card: action.payload}
    case ACTIONS_TYPES.FRONT_SIDE: return {...state, backSide: action.payload}
    case ACTIONS_TYPES.SET_ANIMATION: return {...state, animation: action.payload}
    case ACTIONS_TYPES.SET_MIRROR: return {...state, mirror: action.payload}

    case ACTIONS_TYPES.SET_LOADING: return {...state, loading: action.payload}
    case ACTIONS_TYPES.SET_BTN_DISABLE: return {...state, btnDisable: action.payload}
    case 'null': return null
    default: return state
  }
  // return state;
};

