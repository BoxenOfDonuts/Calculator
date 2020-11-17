let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.calculator button');
let Display = {
	'onScreen': '',
	'operator': operator,
}

function add (a, b) {
	return Number(a) + Number(b);	
}

function subtract (a , b) {
	return Number(a) - Number(b);
}

function sum (array) {
	return array.reduce((sumOf, number) => sumOf + Number(number), 0)
	
}

function multiply (array) {
	return array.reduce((total, value) => total * value, 1)
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

function handleClick(e) {
	// datakey or get innerhtml?
	type = this.dataset.type || '';
	let value = e.target.innerHTML;
	value = (type === 'numbers') ? value: ` ${value} `;
	Display.onScreen += value;
	updateDisplay(value)


}

function updateDisplay(value) {
	display.innerHTML = Display.onScreen;

}

buttons.forEach(button => button.addEventListener('click', handleClick));


document.querySelectorAll

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}