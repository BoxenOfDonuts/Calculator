let display = document.querySelector('.display');
let numberButtons = document.querySelectorAll('.numbers button');
let operatorButtons = document.querySelectorAll('.operators button');
let functionButtons = document.querySelectorAll('.function button');
let clearKey = document.querySelector('#clear');
let removeAtive =  () => operatorButtons.forEach(button => {
	button.classList.remove('active');
})

// event listner to remove active from numbers and =
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
	if (b === 0) {
		return 
	} else {
		return a / b;
	}
}

function transition(e) {
	console.log(e.target.dataset.type)
	if (Array.from(e.target.classList).includes('active')) return;
	removeAtive()
	e.target.classList.add('active');

}

function removeTransition(e) {
	console.log(e.target.dataset.type)
	//if (e.propertyName != 'transform') return;
	if (e.target.dataset.type === 'operator' && e.target.dataset.operator != 'equals') return;
	console.log('made it this far')
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
	// console.log(Display.onScreen[0])
	// if (Display.onScreen[0] === '-') {
	// 	Display.onScreen = Display.onScreen.slice(1);
	// } else {
	// 	Display.onScreen = '-' + Display.onScreen;
	// }
}

function intoPercent() {
	let value = Number(Display.onScreen);
	value/= 100;
	Display.onScreen = value;}

function addDecimal() {
	console.log(Display.lastPressedType)
	if (Display.lastPressedType != 'number') {
		Display.onScreen = '0.';
	} else {
		Display.onScreen += '.';
		console.log(" Display " + Display.onScreen)
	}
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
	// updateActive('');
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
	//result = (Number.isInteger(result)) ? result.toFixed() : result.toFixed(7);

	// if (!(result === 'Error')) {
	// 	console.log('True')
	// 	if (!(Number.isInteger(result))) {
	// 		result = result.toFixed(7);
	// 	}

	// 	Display.firstValue = Number(result);
	// } 
	if (result === 'Error' || isNaN(result)) {
		result = 'Error';
	} else {
		result = parseFloat(result.toFixed(7));
	} 

	Display.onScreen = result;
	// both commented out for the 'Error'
	//Display.onScreen = result;
	//Display.firstValue = Number(result);

	
	updateDisplay()
	console.log(typeof result)
}

function handleOperator(e) {
	let lastPressed = Display.lastPressedType;
	let operation = this.dataset.operator;

	//removeAtive()
	//console.log(e.target.classList)
	//e.target.classList.add('active');

	// update so its highlighted!
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
	console.log(lastPressed)
	if (lastPressed === 'operator') {
		Display.onScreen = '';
		removeAtive();	
	} else if (lastPressed != 'operator'  && Display.onScreen === '0') {
		Display.onScreen = '';
	}

	Display.onScreen += value;
	console.log(lastPressed)
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

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}