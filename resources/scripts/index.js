let display = document.querySelector('.display');
let numberButtons = document.querySelectorAll('.numbers button');
let operatorButtons = document.querySelectorAll('.operators button');
let functionButtons = document.querySelectorAll('.function button');
let removeAtive =  () => operatorButtons.forEach(button => {
	button.classList.remove('active');
})
let buttons = document.querySelectorAll('button');

const Display = {
	'onScreen': '',
	'operator': '',
	'firstValue': '',
	'secondValue': '',
	'activeOperator': '',
	'resultActive': false,
	'lastPressedType': '',
	'clearCount': 0,
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
	if (b === 0) {
		return 
	} else {
		return a / b;
	}
}

function transition(e) {
	if (Array.from(e.target.classList).includes('active')) return;
	removeAtive()
	e.target.classList.add('active');

}

function removeTransition(e) {
	if (e.target.dataset.type === 'operator' && e.target.dataset.operator != 'equals') return;
	e.target.classList.remove('active');

}

function handleFunction(e) {
	let type = this.dataset.type;
	if (type === 'clear') {
		clearDisplay()
	} else if (type === 'sign') {
		flipSign()
	} else if (type === 'percent') {
		intoPercent()
	} else if (type === 'number') {
		addDecimal()
	}
	Display.lastPressedType = this.dataset.type;
	updateDisplay()
}

function flipSign() {
	let value = Number(Display.onScreen);
	value*= -1;
	Display.onScreen = value;
}

function intoPercent() {
	let value = Number(Display.onScreen);
	value/= 100;
	value = parseFloat(value.toFixed(7));
	Display.onScreen = value;
}

function addDecimal() {
	if (Display.lastPressedType != 'number') {
		Display.onScreen = '0.';
	} else if (!Display.onScreen.includes('.')) {
		Display.onScreen += '.';
	}

	updateDisplay()
}

function clearDisplay() {
	if (Display.clearCount >0 ) {
		for (key in Display) {
			Display[key] = '';
		}
	} else {
		if (Display.secondValue) {
			Display.secondValue = '';
		}
	}

	Display.onScreen = '0';
	updateDisplay();
}

function inputEquals() {
	let result = '';
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

	if (result === 'Error' || isNaN(result)) {
		result = 'Error';
	} else {
		result = Number(result)
		result = parseFloat(result.toFixed(7));
		Display.firstValue = Number(result);
	} 

	Display.onScreen = result;	
	updateDisplay()
}

function handleOperator(e) {
	let lastPressed = Display.lastPressedType;
	let operation = this.dataset.operator;

	if (operation != 'equals') {
		Display.operator = operation
		// if last pressed?
		Display.firstValue = Number(Display.onScreen)
	} else {
		if (lastPressed != 'operator') {
			Display.secondValue = Number(Display.onScreen);
		} 
		inputEquals();
	}
	Display.lastPressedType = this.dataset.type;
}

function handleClick(e) {
	let value = e.target.innerHTML;
	let lastPressed = Display.lastPressedType || '';
	if (lastPressed === 'operator') {
		Display.onScreen = '';
		removeAtive();	
	} else if (value === '.') {
		value = '';
		addDecimal()
	} else if (lastPressed != 'operator'  && Display.onScreen === '0') {
		Display.onScreen = '';
	} 

	Display.onScreen += value;
	Display.lastPressedType = this.dataset.type;
	updateDisplay();
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
buttons.forEach(button => button.addEventListener('click', transition))
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
window.addEventListener('keypress', e => {
	let key = '';
	if (e.key != undefined) {
		key = document.querySelector(`button[data-key='${e.key}']`)
	} else if (e.keyCode!= undefined) {
		key = document.querySelector(`button[data-keyCode='${e.keyCode}']`)
	}

	if(!key) return;
	
	key.click();
})

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}