let symbol;
let symbolSize = 40;

// Invoked once
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	background(17, 17, 17)

 	// Initialize Symbol
	symbol = new Symbol(
		width / 2,
		height / 2
	)

	// Generate that random symbol
	symbol.setToRandomSymbol()
	// Set symbol size
	textSize(symbolSize);
}

// get called repeatedly at 60FPS
function draw() {
	// Draw the random symbol
	symbol.renderSymbol();
}

function Symbol(x, y) {
	this.x = x
	this.y = y
	this.value;

	// Set the random symbol - The symbols used in the matrix movie screen is Katakana
	this.setToRandomSymbol = function() {
		this.value = String.fromCharCode(
			0x30A0 + round(random(0, 96)) // 96 symbols in Katakana
		)
	}

	// Render the symbol on screen
	this.renderSymbol = function() {
		fill(0 ,255, 80)
		text(this.value, this.x, this.y)
	}
}