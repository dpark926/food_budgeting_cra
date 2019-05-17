import React, { Component } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import Form from "./components/Form";
import History from "./components/History";
import { formatMoney, getLocalDate, sortByDate } from "./utils/functions";
import { months } from "./utils/variables";
import { keys } from "./config/keys";
import "./App.scss";

class App extends Component {
  state = { date: getLocalDate(), openMonths: [0] };

  componentDidMount() {
    fetch("/api/transactions")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => console.log(err));
  }

  toggleModal = () => {
    const { showModal } = this.state;

    this.setState({ showModal: !showModal });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { date, store, amount } = this.state;
    e.preventDefault();
    console.log(date);
    if (date && store && amount) {
      axios
        .post(keys.db, {
          date,
          store,
          amount
        })
        .then(res =>
          this.setState({ data: sortByDate([...this.state.data, res.data]) })
        );

      this.toggleModal();
    }
  };

  toggleAccordion = idx => {
    const { openMonths } = this.state;
    if (openMonths.includes(idx)) {
      const filtered = openMonths.filter(num => {
        return num !== idx;
      });
      this.setState({ openMonths: filtered });
    } else {
      this.setState({ openMonths: [...openMonths, idx] });
    }
  };

  render() {
    const { showModal, data = [], date, openMonths } = this.state;
    const history = {};
    const historyArry = [];

    for (let i = 0; i < data.length; i++) {
      const month = parseInt(data[i].date.slice(6, 8));
      if (history[months[month - 1]]) {
        history[months[month - 1]] += parseFloat(data[i].amount);
      } else {
        history[months[month - 1]] = parseFloat(data[i].amount);
      }
    }

    for (let key in history) {
      historyArry.push({ month: key, total: formatMoney(history[key]) });
    }

    return (
      <div className="roboto" style={{ background: "#f6f6f6" }}>
        <div className="bg-white border-bottom gray p2">
          <h3 className="lighter m0">Login</h3>
        </div>
        <div className="border-divider bg-white rounded m2 pt2 pb1">
          <LineChart
            width={330}
            height={200}
            data={historyArry}
            margin={{
              top: 10,
              right: 0,
              left: -25,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "gray", fontSize: 12 }} />
            <YAxis tick={{ fill: "gray", fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#0088FE"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <Form
          date={date}
          showModal={showModal}
          toggleModal={this.toggleModal}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <History
          data={data}
          toggleAccordion={this.toggleAccordion}
          openMonths={openMonths}
        />
      </div>
    );
  }
}

export default App;
