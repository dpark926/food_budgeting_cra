import React from "react";
import { formatMoney, sortByDate } from "../utils/functions";
import { months } from "../utils/variables";

const History = props => {
  const { data, toggleAccordion, openMonths } = props;
  const sortedData = sortByDate(data);
  const history = {};

  for (let i = sortedData.length - 1; i >= 0; i--) {
    const d = sortedData[i].date;
    const month = parseInt(d.slice(5, 7));
    const year = d.slice(0, 4);

    if (history[`${month}/${year}`]) {
      history[`${month}/${year}`].total += parseFloat(data[i].amount);
      history[`${month}/${year}`].list.push(data[i]);
    } else {
      history[`${month}/${year}`] = {
        month,
        year,
        total: parseFloat(data[i].amount),
        list: [data[i]]
      };
    }
  }

  return (
    <div className="mx2 mb2">
      {Object.keys(history).map((month, idx) => {
        return (
          <div
            className={`border-divider rounded bg-white ${idx !== 0 && "mt1"}`}
            key={month + idx}
          >
            <div
              className={`border-bottom rounded box-shadow light-gray bg-blue px2 `}
              key={month + idx}
              onClick={() => toggleAccordion(idx)}
            >
              <div className="flex white pt1 normal">
                <p className="col-3 h5 pb1 m0">
                  {`${months[
                    history[month].month - 1
                  ].toUpperCase()} '${month.slice(4)}`}
                </p>
                <div className="flex col-9">
                  <p className="col-9 flex-auto h5 pb1 m0 right-align">
                    TOTAL:
                  </p>
                  <p className="col-3 right-align h5 pb1 m0">
                    ${formatMoney(history[month].total)}
                  </p>
                </div>
              </div>
            </div>
            {openMonths.includes(idx) &&
              history[month].list.map((obj, key) => {
                return (
                  <div
                    className="border-top light-gray mx2"
                    key={obj.date + obj.store + idx}
                  >
                    <div className="flex black pt1">
                      <p className="col-3 h5 pb1 m0">{`${obj.date.slice(
                        5,
                        7
                      )}/${obj.date.slice(8)}`}</p>
                      <div className="flex col-9">
                        <p className="h5 pb1 m0 capitalize">{obj.store}</p>
                        <p className="flex-auto right-align h5 pb1 m0">
                          ${formatMoney(obj.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default History;
