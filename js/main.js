let symbolSize = 30;
let stream;

// Invoked once
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	background(17, 17, 17)

	// Set symbol size
	textSize(symbolSize);

	// Create stream
	stream = new Stream()

	// Generate the symbols
	stream.generateSymbols()
}

// get called repeatedly at 60FPS
function draw() {
	// Redraw the background color
	background(17, 17, 17)
	// Draw the random symbol
	stream.render();
}

function Symbol(x, y, speed) {
	this.x = x
	this.y = y
	this.speed = speed
	this.value
	this.switchInterval = round(random(2, 20))

	// Set the random symbol - The symbols used in the matrix movie screen is Katakana
	this.setToRandomSymbol = function() {
		// Conditionally change the interval of switching the symbols
		if(frameCount % this.switchInterval == 0) {
			this.value = String.fromCharCode(
				0x30A0 + round(random(0, 96)) // 96 symbols in Katakana
			)
		}
	}

	// Raining symbol
	this.rain = function() {
		// Reset the y for continous rain
		(this.y >= height) ? this.y = 0 : this.y += this.speed
	}
}

function Stream() {
	this.symbols = []
	this.totalSymbols = round(random(5, 25))
	this.speed = round(random(5, 15))

	// Generate array of symbols which will be part of a stream
	this.generateSymbols = function() {
		let y = 0
		let x = width / 2

		for(let i = 0; i <= this.totalSymbols; i++) {
			// create new symbol
			symbol = new Symbol(x, y, this.speed)
			// set to random symbol
			symbol.setToRandomSymbol()
			// push to streams array
			this.symbols.push(symbol)
			// decrement the y by symbol size to ensure next symbol is generated just above the previous one
			y -= symbolSize
		}
	}

	// Display the stream
	this.render = function () {
		this.symbols.forEach(function(symbol) {
			fill(0 ,255, 80)
			text(symbol.value, symbol.x, symbol.y)
			symbol.rain()
			symbol.setToRandomSymbol()
		})
	}
}