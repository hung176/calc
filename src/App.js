import React, {useState} from "react";
import "./styles.css";
import operators from "./operator.js";

export default function App() {
  const [display, setDisplay] = useState('');
  const [results, setResults] = useState(0);

  const num = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "."];
  const zero = 0;

  // Hàm lấy giá trị từ các nút số cập nhật vào State
  const handleClick = e => {
    setDisplay(display + e.target.value );
  };

  // Hàm lấy giá trị từ các toán tử cập nhật vào State
  const handleOper = e => {
    const result = calculate();

    const deleteSign = parseFloat(display);

    result !== false
      ? setDisplay(result + e.target.value )
      : setDisplay(deleteSign + e.target.value);
  };

  // Hàm tính toán ra kết quả cập nhật vào State
  const calculate = () => {
    const displayString = display.toString();
    const operator = operators.find(op => displayString.includes(op.sign));

    if (!operator) {
      return false;
    }

    const { sign, compute } = operator;

    const [val1, val2] = displayString
      .split(sign)
      .map(parseFloat);

    if (Number.isNaN(val1) || Number.isNaN(val2)) {
      return false;
    }

    const results = compute(val1, val2);

    setDisplay(results);
    setResults(results);
    return results;
  };
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
                onClick={handleClick}
              >
                {val}
              </button>
            ))}

            {/* nút số 0 */}
            <button
              className="btn btn-number btn-zero"
              value={zero}
              onClick={handleClick}
            >
              {" "}
              {zero}{" "}
            </button>
          </div>

          {/* Các toán tử */}
          <div className="btn-oper-container">
            {operators.map(({ sign }, index) => (
              <button
                key={index}
                className="btn btn-oper"
                value={sign}
                onClick={handleOper}
              >
                {sign}
              </button>
            ))}
          </div>
        </div>

        {/* toán tử = */}
        <button className="btn btn-result" onClick={calculate}>
          =
        </button>

        {/* nút CLEAR */}
        <button
          className="btn-clear"
          onClick={() =>{
            setDisplay('');
            setResults(0);
          }}
        >
          CLEAR
        </button>
      </div>
    );

}
