let display = document.querySelector('.display');
let numberButtons = document.querySelectorAll('.numbers button');
let operatorButtons = document.querySelectorAll('.operators button');
let functionButtons = document.querySelectorAll('.function button');

const Display = {
	'onScreen': '',
	'operator': '',
	'firstValue': '',
	'secondValue': '',
	'activeOperator': '',
	'resultActive': false,
}

function add (a, b) {
	return a + b	
}

function subtract (a , b) {
	return a - b;
}

function sum (array) {
	return array.reduce((sumOf, number) => sumOf + Number(number), 0)
	
}

function multiply (a, b) {
	// from calculator js 
	//return array.reduce((total, value) => total * value, 1)
	return a * b;
}

function power(value, toPowerOf) {
	return Math.pow(value, toPowerOf);
// 	let total = 1
// 	for (let i=0; i < toPowerOf; i++) {
// 		total *= value 
// 	}

// 	return total;
}

function factorial(value) {
	// n x (n-1)
	n = Number(value)

	if (n <= 1) {
		return 1;
	}

	return n * factorial(n -1);

}

function divide(a, b) {
    return a / b;
}

function operator(a, b, operator) {
    console.log(a, b, operator)

    return subtract(a, b)

}

function updateActive(e) {
	if (Display.activeOperator) {
		Display.activeOperator.target.classList.toggle('active');
		Display['activeOperator'] = e;
	} else {
		Display['activeOperator'] = e;
	}
	if (Display.activeOperator) {
		Display.activeOperator.target.classList.toggle('active');
	}
}

function clearDisplay() {
	for (key in Display) {
		Display[key] = '';
	}
}

function inputEqual() {
	let result = '';
	updateActive('');
	switch(Display.operator) {
		case 'add':
			result = add(Display.firstValue, Display.secondValue);
			break;
		case 'subtract':
			result = subtract(Display.firstValue, Display.secondValue);
			break;
		case 'multiply':
			result = multiply(Display.firstValue, Display.secondValue);
			break;
		case 'divide':
			result = divide(Display.firstValue, Display.secondValue);
			break;
	}
	result = (Number.isInteger(result)) ? result: result.toFixed(7);

	Display.onScreen = result;
	Display.firstValue = result;
	Display.resultActive = true;
	updateDisplay()
	console.log(result)
}

function handleOperator(e) {
	let operation = this.dataset.operator || '';
	updateActive(e)
	console.log(operation)

	if (operation != 'equals' && Display.firstValue && !Display.resultActive) {
		//Display.firstValue = Display.result
		Display.secondValue = Number(Display.onScreen);
	 	inputEqual();
		//Display.onScreen = '';
	} else if (operation === 'equals') {
		if (!Display.resultActive) {
			Display.secondValue = Number(Display.onScreen);
		} else {
			Display.firstValue = Number(Display.onScreen);
		}
		inputEqual();

	} else if (operation != 'equals' && operation) {
		console.log(Display.onScreen)
		Display.operator = operation;
		Display['firstValue'] = Number(Display.onScreen);
		//Display.onScreen = '';
	}
	// else {
	// 	Display.secondValue = Number(Display.onScreen);
	// 	inputEqual();

	// }
	console.log(Display)


}

function handleClick(e) {
	updateActive('')
	// datakey or get innerhtml?
	// update so it adds a class on the operator click
	type = this.dataset.type || '';
	let value = e.target.innerHTML;
	//value = (type === 'numbers') ? value: ` ${value} `;
	//if (type === 'numbers') {
	//	Display.onScreen += value;
	//}
	if (Display.resultActive) {
		Display.onScreen = '';
		Display.resultActive = false;
		Display.secondValue = '';
	} else if (Display.operator) {
		Display.onScreen = '';
	}
	Display.onScreen += value

	updateDisplay()

}

function handleFunction(e) {
	let type = this.dataset.type;
	if (type === 'clear') {
		clearDisplay()
	} else if (type === 'sign') {
		flipSign()
	} else if (type === 'percent') {
		intoPercent()
	} else if (type === 'decimal') {
		toFloat()
	}

	updateDisplay()
}

function flipSign() {
	console.log(Display.onScreen[0])
	if (Display.onScreen[0] === '-') {
		Display.onScreen = Display.onScreen.slice(1);
	} else {
		Display.onScreen = '-' + Display.onScreen;
	}
}

function intoPercent() {
	Display.onScreen = (Display.onScreen / 100);
}

function toFloat() {

}

function updateDisplay() {
	if (Display.onScreen.length > 9) {
		Display.onScreen = Display.onScreen.substr(0,9);
	}
	display.innerHTML = Display.onScreen;

}

numberButtons.forEach(button => button.addEventListener('click', handleClick));
operatorButtons.forEach(button => button.addEventListener('click', handleOperator));
functionButtons.forEach(button => button.addEventListener('click', handleFunction));

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}