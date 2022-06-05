const USD = document.querySelector('[data-value="USD"]');
const EUR = document.querySelector('[data-value="EUR"]');
const PLN = document.querySelector('[data-value="PLN"]');

const selectLeft = document.querySelector('#selectLeft');
const selectRight = document.querySelector('#selectRight');

const inputLeft = document.querySelector('#inputLeft');
const inputRight = document.querySelector('#inputRight');

const rates = {}
let ratesKeys;

async function getCurrencies() {
	const request = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
	const data = await request.json();
	const result = await data;

	console.log(data)

	for (let i = 0; i < result.length; i++) {
			rates[result[i].cc] = result[i]
	}
	ratesKeys = Object.keys(rates).sort()

	USD.textContent = (rates.USD.rate).toFixed(2) + ' ₴';
	EUR.textContent = (rates.EUR.rate).toFixed(2) + ' ₴';
	PLN.textContent = (rates.PLN.rate).toFixed(2) + ' ₴';
};

getCurrencies();

function updateCurrenciesList() {

	for (let i = 0; i < ratesKeys.length; i++) {
		let newCurrency = document.createElement('option')
		newCurrency.innerHTML = `${ratesKeys[i]} - ${rates[ratesKeys[i]].txt}`
		newCurrency.value = ratesKeys[i]
		selectRight.appendChild(newCurrency)
	}

}

setTimeout(updateCurrenciesList,1000)



inputLeft.addEventListener('input',convertValueLeft);
inputRight.addEventListener('input',convertValueRight);
selectRight.addEventListener('input',convertValueLeft);

function convertValueLeft() {
	if (inputLeft.value !== '' ) {
		inputRight.value = (parseFloat(inputLeft.value) / rates[selectRight.value].rate).toFixed(2);
	} else {
		inputRight.value = '';
	}
}

function convertValueRight() {
	if (inputRight.value !== '' ) {
		inputLeft.value = (parseFloat(inputRight.value) * rates[selectRight.value].rate).toFixed(2);
	} else {
		inputLeft.value = '';
	}
};

function reverseBack() {
	reverseBtn.style.transform = 'rotate(0deg)';
	let row = document.querySelector('.row-secondary');
	let style = getComputedStyle(row);
	let spanGive = document.querySelector('.span-give');
	let spanTake = document.querySelector('.span-take');
	spanTake.innerHTML = 'Take:';
	spanGive.innerHTML = 'Give:';
	if (screen.width > 564) {
		row.style.flexDirection = 'row';
	} else if (screen.width <= 564) {
		row.style.flexDirection = 'column'
	};
	selectRight.addEventListener('input',convertValueLeft);
	inputLeft.addEventListener('input',convertValueLeft);
	inputRight.addEventListener('input',convertValueRight);
	inputRight.removeEventListener('input',() => {
		inputLeft.value = (inputRight.value * rates[selectRight.value].rate).toFixed(2);
	});
	inputLeft.removeEventListener('input',() => {
		inputRight.value = (inputLeft.value / rates[selectRight.value].rate).toFixed(2);
	});
	selectRight.removeEventListener('input',() => {
		inputLeft.value = (inputRight.value * rates[selectRight.value].rate).toFixed(2);
	});
	reverseBtn.addEventListener('click',reverse);
}

function reverse() {
	reverseBtn.style.transform = 'rotate(180deg)';
	let spanGive = document.querySelector('.span-give');
	let spanTake = document.querySelector('.span-take');
	spanTake.innerHTML = 'Give:';
	spanGive.innerHTML = 'Take:';
	let row = document.querySelector('.row-secondary');
	let style = getComputedStyle(row);
	if (screen.width > 564) {
		row.style.flexDirection = 'row-reverse';
	} else if (screen.width <= 564) {
		row.style.flexDirection = 'column-reverse'
	};
	selectRight.removeEventListener('input',convertValueLeft);
	inputLeft.removeEventListener('input',convertValueLeft);
	inputRight.removeEventListener('input',convertValueRight);
	inputRight.addEventListener('input',() => {
		inputLeft.value = (inputRight.value * rates[selectRight.value].rate).toFixed(2);
	});
	inputLeft.addEventListener('input',() => {
		inputRight.value = (inputLeft.value / rates[selectRight.value].rate).toFixed(2);
	});
	selectRight.addEventListener('input',() => {
		inputLeft.value = (inputRight.value * rates[selectRight.value].rate).toFixed(2);
	});
	reverseBtn.removeEventListener('click',reverse);
	reverseBtn.addEventListener('click',reverseBack);
};

let reverseBtn = document.querySelector('.reverse-button');

reverseBtn.addEventListener('click',reverse);

let arrowLeft = document.querySelector('.arrowLeft');
let arrowRight = document.querySelector('.arrowRight');

function arrowDownLeft() {
	arrowLeft.style.transform = 'rotate(0deg)';
	selectLeft.addEventListener('click',arrowUpLeft);
}

function arrowUpLeft() {
	arrowRight.style.transform = 'rotate(0deg)';
	arrowLeft.style.transform = 'rotate(180deg)';
	selectLeft.removeEventListener('click',arrowUpLeft);
	selectLeft.addEventListener('click',arrowDownLeft);
}

function arrowDownRight() {
	arrowRight.style.transform = 'rotate(0deg)';
	selectRight.addEventListener('click',arrowUpRight);
}

function arrowUpRight() {
	arrowRight.style.transform = 'rotate(180deg)';
	arrowLeft.style.transform = 'rotate(0deg)';
	selectRight.removeEventListener('click',arrowUpRight);
	selectRight.addEventListener('click',arrowDownRight);
}

selectLeft.addEventListener('click',arrowUpLeft);
selectRight.addEventListener('click',arrowUpRight);
