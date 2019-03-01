import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator__keys');

    // second pass
    const display = document.querySelector('.calculator__display');

    keys.addEventListener('click', e => {
      if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;

        // second pass
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // third pass
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
          console.log("this is " + key.textContent);
          calculator.dataset.previousKeyType = "number";
          // second pass -- third pass add previousKeyType === 'operator'
          if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
            display.textContent = keyContent;
          } else {
            display.textContent = displayedNum + keyContent;
          }
        }
        if (
          action === "add" ||
          action === "subtract" ||
          action === "multiply" ||
          action === "divide"
        ) {
          console.log("operator is " + key.textContent);
          //fifth
          const firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          const secondValue = displayedNum;
          if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
            const calcValue = this.calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;
            calculator.dataset.firstValue = calcValue;
          } else {
            calculator.dataset.firstValue = displayedNum;
          }

          // third pass
          calculator.dataset.previousKeyType = "operator";

          //fourth pass
          calculator.dataset.operator = action;

        }
        if (action === "decimal") {
          console.log("decimal key");
          // second pass
          if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + ".";
          } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
            display.textContent = "0.";
          }
          calculator.dataset.previousKeyType = "decimal";

        }
        if (action === "clear") {
          console.log("clear key");
          //fourth pass
          calculator.dataset.firstValue = "";
          calculator.dataset.operator = "";
          calculator.dataset.modValue = "";

          display.textContent = "0";
          calculator.dataset.previousKeyType = "clear";
        }
        if (action === "calculate") {
          console.log("calculate key")
          //third pass
          //const secondValue = displayedNum;

          //fourth pass
          let firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          let secondValue = displayedNum;

          if (firstValue) {
            if (previousKeyType === "calculate") {
              firstValue = displayedNum;
              secondValue = calculator.dataset.modValue;
            }
            display.textContent = this.calculate(firstValue, operator, secondValue);
          }
          calculator.dataset.modValue = secondValue;
          calculator.dataset.previousKeyType = "calculate";
        }
      }
    })
  }

  calculate(n1, operator, n2) {
    let num1 = parseFloat(n1);
    let num2 = parseFloat(n2);
    if (operator === "add") return (num1 + num2);
    if (operator === "subtract") return (num1 - num2);
    if (operator === "multiply") return (num1 * num2);
    if (operator === "divide") return (num1 / num2);
  }

  render() {
    return (
      <div className = "calculator">
        <div className = "calculator__display">0</div>
        <div className = "calculator__keys">
          <button className = "key--operator" data-action = "add">+</button>
          <button className = "key--operator" data-action = "subtract">-</button>
          <button className = "key--operator" data-action = "multiply">*</button>
          <button className = "key--operator" data-action = "divide">/</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>0</button>
          <button data-action = "decimal">.</button>
          <button data-action = "clear">AC</button>
          <button className = "key--equal" data-action = "calculate">=</button>
        </div>
      </div>
    );
  }
}

export default App;
