import React from "react";

const Period = ({ period }) => {
  return <h5>{period}</h5>;
};

const PeriodMemo = React.memo(
  Period,
  ({ period: prevPeriod }, { period: nextPeriod }) => {
    return !(prevPeriod !== nextPeriod);
  }
);

export default PeriodMemo;
