// Select UI elements
const errorElement = document.querySelector(".error");
const outputElement = document.querySelector(".output");
const formElement = document.querySelector(".form");

// Add listeners
formElement.addEventListener("submit", submit);

// Define operations collection with operation signs as a key and corresponding calculating functions as a value
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

/**
 * Function for calculating basic expression.
 * @param {string} operator - Operator sign.
 * @param {number} firstOperand - First number in operation.
 * @param {number} secondOperand - Second number in operation.
 * @returns {number} - The result of the calculated expression.
 */

function calculateBasicExpression(operator, firstOperand, secondOperand) {
  // Operations collection is taken from gloal scope
  const result = operations[operator](firstOperand, secondOperand);
  return result;
}

/**
 * Functon for expression calculation.
 * Although it was not required from the task, the function contains basic guards to check whether a valid expression was entered.
 * The guards can be optimized, for example by checking the expression before it is processed, or giving more meaningful error messages.
 * @param {string} expression - Expression to calculate.
 * @returns {number} - The result of the calculated expression.
 */

const calculate = function (expression) {
  // Guard: If expression is empty, throw an error
  if (!expression.trim()) throw new Error("Expression is empty");

  // Convert expression string into array. Trim unnecessary whitespace characters.
  const parsedExpression = expression.trim().split(" ");

  // Operands on the right site of expression are first to calculate, so expression should be analysed from right to left
  // Reverse array for right to left analyzing order
  parsedExpression.reverse();

  // Declare stack for containg current operation status
  const stack = [];

  // Analyzing expression
  parsedExpression.forEach((element) => {
    // Check if element is valid operator. Operations collection is taken from global scope.
    if (operations.hasOwnProperty(element)) {
      // Get operands from top of calculation stack
      const firstOperand = stack.pop();
      const secondOperand = stack.pop();

      // Push calculation result to stack
      stack.push(calculateBasicExpression(element, firstOperand, secondOperand));
    } else {
      // Push expression element with type number to the stack.
      stack.push(Number(element));
    }
  });

  // Guard: If there are unprocessed elements left in the stack, throw an error
  if (stack.length !== 1) throw new Error("Expression is invalid");

  // First (and only) element of stack is the result
  const result = stack[0];

  // Guard: If result calculated result is not a number due to invalid characters, throw an error
  if (isNaN(result)) throw new Error("Expression is invalid");

  return result;
};

function submit(e) {
  try {
    hideError();
    e.preventDefault();
    const formData = new FormData(e.target);
    const expression = formData.get("expression");
    const result = calculate(expression);
    showResult(result);
  } catch (error) {
    showError(error);
  }
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
