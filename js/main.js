let symbolSize = 25;
let streams = [];

// Invoked once
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	background(17, 17, 17)

	// Set symbol size
	textSize(symbolSize)

	// Initial position for stream
	let x = 0

	// Loop and generate array of different streams
	for (let i = 0; i <= width/ symbolSize; i++) {
		// initialize stream
		stream = new Stream()
		// generate new stream
		stream.generateSymbols(x, random(-1000, 0))
		// push this new stream to major streams array - Global declaration
		streams.push(stream)
		// increment x position with symbolSize for alignment
		x += symbolSize + round(random(10,20))
	}
}

// get called repeatedly at 60FPS
function draw() {
	// Redraw the background color
	background(17, 17, 17, 150)
	
	// loop through the streams array and render all streams
	streams.forEach(function(stream) {
		stream.render()
	})
}

function Symbol(x, y, speed, first) {
	this.x = x
	this.y = y
	this.speed = speed
	this.value
	this.switchInterval = round(random(2, 20))
	this.first = first

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
	this.generateSymbols = function(x, y) {
		// initially first will be true
		let first = true
		for(let i = 0; i <= this.totalSymbols; i++) {
			// create new symbol
			symbol = new Symbol(x, y, this.speed, first)
			// set to random symbol
			symbol.setToRandomSymbol()
			// push to streams array
			this.symbols.push(symbol)
			// decrement the y by symbol size to ensure next symbol is generated just above the previous one
			y -= symbolSize
			// set first to false
			first = false
		}
	}

	// Display the stream
	this.render = function () {
		this.symbols.forEach(function(symbol) {
			// conditionally fill the color of first and rest of other symbols
			(symbol.first) ? fill(150 ,255, 180) : fill(0 ,255, 80)
			text(symbol.value, symbol.x, symbol.y)
			symbol.rain()
			symbol.setToRandomSymbol()
		})
	}
}