import "./_style.scss";
import { useSelector } from "react-redux";

import React from "react";
import { BaseLoader } from "../BaseLoader/BaseLoader";
const types = ["visa", "mastercard", "american", "discover"];
export const BankCard = ({ type, cardData }) => {
  const animation = useSelector((state) => state.animation);
  const mirror = useSelector((state) => state.mirror);
  const loading = useSelector((state) => state.loading);

  return (
    <div className={`bank-card-wrapper ${mirror}`}>
      <div className={`bank-card ${type} ${animation}`}>
        {loading ? (
          <BaseLoader />
        ) : (
          <>
            {types.includes(type.split("-")[0]) && type === `${type.split("-")[0]}-front` ? (
              <div className="bank-card__requisites">
                <div className="bank-card__number">
                  <span className="bank-card__text">{cardData.number}</span>
                </div>
                <div className="bank-card__info">
                  <div className="bank-card__name">
                    <span className="bank-card__text"> {cardData.name}</span>
                  </div>
                  <div className="bank-card__exp-date">
                    <span className="bank-card__text">
                      {cardData.month > 9 ? cardData.month : `0${cardData.month}`}/{cardData.year}
                    </span>
                  </div>
                </div>
              </div>
            ) : types.includes(type.split("-")[0]) && type === `${type.split("-")[0]}-back` ? (
              <div className="bank-card__back-side">
                <div className="bank-card__info-back-side">
                  <span className="bank-card__name-back-side">{cardData.name}</span>
                  <span className="bank-card__cvv-back-side">{cardData.cvv}</span>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
