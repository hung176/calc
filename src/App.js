import React from "react";
import "./styles.css";
import { add, sub, mul, div } from "./operator.js";

const operators = ["+", "-", "x", "/"];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: 0,
      display: ""
    };
  }

  // Hàm lấy giá trị từ các nút số cập nhật vào State
  handleClick = e => {
    this.setState({ display: this.state.display + e.target.value });
  };

  // Hàm lấy giá trị từ các toán tử cập nhật vào State
  handleOper = e => {
    const result = this.calculate();
    let display = this.state.display;
    let deleteSign = parseFloat(display);

    if (result !== false) {
      this.setState({ display: result + e.target.value });
    } else {
      this.setState({ display: deleteSign + e.target.value });
    }
  };

  // Hàm tính toán ra kết quả cập nhật vào State
  calculate = () => {
    const { display } = this.state;
    const sign = operators.find(op => display.includes(op));
    const [val1, val2] = display.split(sign).map(parseFloat);

    if (!sign || Number.isNaN(val1) || Number.isNaN(val2)) {
      return false;
    }

    let results;
    if (sign === "+") {
      results = add(val1, val2);
    } else if (sign === "-") {
      results = sub(val1, val2);
    } else if (sign === "x") {
      results = mul(val1, val2);
    } else if (sign === "/") {
      results = div(val1, val2);
    }

    this.setState({ display: results, results });
    return results;
  };

  render() {
    const num = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "."];
    const zero = 0;
    const operators = ["+", "-", "x", "/"];
    let display = this.state.display;
    let results = this.state.results;

    return (
      <div className="App">
        {/* Hiển thị và kết quả */}
        <div className="display">{display}</div>
        <div className="results">{results}</div>

        {/* Các nút số */}
        <div className="btn-container">
          <div className="btn-number-container">
            {num.map(val => (
              <button
                key={val}
                className="btn btn-number"
                value={val}
                onClick={this.handleClick}
              >
                {val}
              </button>
            ))}

            {/* nút số 0 */}
            <button
              className="btn btn-number btn-zero"
              value={zero}
              onClick={this.handleClick}
            >
              {" "}
              {zero}{" "}
            </button>
          </div>

          {/* Các toán tử */}
          <div className="btn-oper-container">
            {operators.map((op, index) => (
              <button
                key={index}
                className="btn btn-oper"
                value={op}
                onClick={this.handleOper}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* toán tử = */}
        <button className="btn btn-result" onClick={this.calculate}>
          =
        </button>

        {/* nút CLEAR */}
        <button
          className="btn-clear"
          onClick={() =>
            this.setState({
              results: 0,
              display: ""
            })
          }
        >
          CLEAR
        </button>
      </div>
    );
  }
}
