const errorElement = document.querySelector(".error");
const outputElement = document.querySelector(".output");

document.querySelector(".form").addEventListener("submit", submit);
const availableOperators = ["+", "-", "*", "/"];

function submit(e) {
  try {
    hideError();
    e.preventDefault();
    const formData = new FormData(e.target);
    const expressionString = formData.get("expression");
    const expression = expressionString.trim().split(" ");
    const result = evaluate(expression);
    showResult(result);
  } catch (error) {
    showError(error);
  }
}

function isResultValid(result) {
  if (result.length > 1) return false;
  if (isNaN(result)) return false;
  return true;
}

function computeExpression(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
  }
}

function evaluate(expression) {
  const stack = [];
  expression.reverse().forEach((element) => {
    if (availableOperators.includes(element)) {
      const operator = element;
      const secondOperand = stack.pop();
      const firstOperand = stack.pop();
      const result = computeExpression(operator, firstOperand, secondOperand);
      stack.push(result);
    } else stack.push(Number(element));
  });
  if (!isResultValid(stack)) throw new Error("Invalid prefix expression");
  return stack[0];
}

function showResult(result) {
  outputElement.innerHTML = result;
}
function showError(error) {
  errorElement.innerHTML = error.message;
  errorElement.classList.remove("hidden");
  outputElement.innerHTML = "";
}
function hideError() {
  errorElement.innerHTML = "";
  errorElement.classList.add("hidden");
}
