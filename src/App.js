import React from "react";
import "./styles.css";
import { add, sub, mul, div } from "./operator.js";

const operators = ["+", "-", "x", ":"];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: 0,
      display: "",
      val1: 0,
      val2: 0,
      sign: ""
    };
  }

  // Hàm lấy giá trị từ các nút số cập nhật vào State
  handleClick = e => {
    const val = e.target.value;
    const sign = this.state.sign;
    const results = this.state.results;
    let display = this.state.display + val;

    if (results !== 0) {
      const lastIndexOfSign = display.lastIndexOf(sign) + 1;
      const val2 = parseFloat(display.slice(lastIndexOfSign));
      this.setState({ val1: results, val2, display });
    } else {
      if (sign === "") {
        const val1 = parseFloat(display);
        this.setState({ val1, display });
      } else {
        const indexOfSign = display.indexOf(sign) + 1;
        const val2 = parseFloat(display.slice(indexOfSign));
        this.setState({ val2, display });
      }
    }
  };

  // Hàm lấy giá trị từ các toán tử cập nhật vào State
  handleOper = e => {
    const sign = this.state.sign;
    const val1 = this.state.val1;
    const val2 = this.state.val2;
    let results, display;
    let setVal2 = 0;

    switch (sign) {
      case "+":
        results = add(val1, val2);
        break;
      case "-":
        results = sub(val1, val2);
        break;
      case "x":
        val2 !== 0
          ? (results = mul(val1, val2))
          : (results = this.state.results);
        setVal2 = 1;
        break;
      case "/":
        results = div(val1, val2);
        setVal2 = 1;
        break;
      default:
        results = add(val1, val2);
    }

    display = results + e.target.value;
    this.setState({
      sign: e.target.value,
      display,
      val1: results,
      val2: setVal2,
      results
    });
  };

  // Hàm tính toán ra kết quả cập nhật vào State
  handleCalculate = () => {
    const { display } = this.state;
    const sign = operators.find(op => display.includes(op));
    const [val1, val2] = display.split(sign).map(parseFloat);

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
    this.setState({ results });
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
        <button
          className="btn btn-result"
          onClick={() => this.handleCalculate()}
        >
          =
        </button>

        {/* nút CLEAR */}
        <button
          className="btn-clear"
          onClick={() =>
            this.setState({
              results: 0,
              display: "",
              val1: 0,
              val2: 0,
              sign: "+"
            })
          }
        >
          CLEAR
        </button>
      </div>
    );
  }
}
