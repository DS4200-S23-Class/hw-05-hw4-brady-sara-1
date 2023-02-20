/* homework 5
Sara & Brady */

// declare constants
const FRAME_HEIGHT = 550;
const FRAME_WIDTH = 600;
const MARGINS = {left: 50, right: 50,
				top: 50, bottom: 50};

// for scaling function
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// create a frame for first vis in column 1
const FRAME1 = d3.select("#col1")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");

// read data from first file
d3.csv("data/scatter-data.csv").then((data) => {

	console.log(data);

	// get max x and y values
	const MAX_X = d3.max(data, d => {return parseInt(d.x)});
	const MAX_Y = d3.max(data, d => {return parseInt(d.y)});

	// scaling functions
	const X_SCALE = d3.scaleLinear()
						.domain([0, (MAX_X)])
	    				.range([0, (MAX_Y * 50)]);

	// range has to go from big to small so that 
	// the data is flipped along the y-axis (how a user would be 
	//  used to seeing a plot)
	const Y_SCALE = d3.scaleLinear()
						.domain([0, (MAX_Y)])
	    				.range([(MAX_Y * 50), 0]);

	// plot
	FRAME1.selectAll(".point")
					.data(data)
	    			.enter().append("circle")
	    						.attr("class", "point")
	    						.attr("cx", d => {
	    								return X_SCALE(parseInt(d.x)) + MARGINS.left
	    							})
	    						.attr("cy", d => {
	    								return Y_SCALE(parseInt(d.y)) + MARGINS.top
	    						})
	    						.attr("r", 10);


	// create x-axis
	FRAME1.append("g")
      		.attr("transform", "translate(" + 
      			MARGINS.left+ "," + (MARGINS.top + VIS_HEIGHT) + ")")
      			.call(d3.axisBottom(X_SCALE).ticks(10));

	// create y-axis
	FRAME1.append("g")
      		.attr("transform", "translate(" + 
      			MARGINS.left + "," + (MARGINS.top) + ")")
      		.call(d3.axisLeft(Y_SCALE).ticks(10));




	// Add border function
	function pointClicked() {
		
		// change class if clicked based on event listener
		this.classList.toggle("addBorder");
		this.classList.toggle("point");

		// get x and y coordinates
		let x_var = (this.getAttribute("cx") / 50) - 1;
		let y_var = (500 - this.getAttribute("cy")) / 50;

		// create new text
		let text1 = "Last point clicked: "
		let text2 = "(" + x_var +"," + y_var + ")"
		
		// replace text
		document.getElementById("last_point1").innerHTML = text1;
		document.getElementById("last_point2").innerHTML = text2;
	}

	// Create list of points
	let points = document.getElementsByTagName("circle");

	// loop through all points
	for (let i = 0; i < points.length; i++) {
		
	    // check each point for clicks
	    let point = points[i];
	    point.addEventListener("click", pointClicked);
	}

	function addPoint() {
	// get the user input selections
	let xInput = document.getElementById("x-coord");
	let yInput = document.getElementById("y-coord");

	// get the values from the user selections
	let xCoord = xInput.value;
	let yCoord = yInput.value;

	// convert the values to the same ratio for the graph
	let x = (xCoord * 50);
	let y = 500 - (yCoord * 50);

	// add point
	FRAME1.append("circle")
	    	.attr("class", "point")
	    	.attr("cx", (x + MARGINS.left))
	    	.attr("cy", (y))
	    	.attr("r", 10);

	// loop through all points
	for (let i = 0; i < points.length; i++) {
	    
	    // check each point for clicks
	    let point = points[i];
	    point.addEventListener("click", pointClicked);
		}
	}

	// get the button Id
	let pointButton =  document.getElementById("subButton");
	// listen for a click
	pointButton.addEventListener("click", addPoint);
});



// create a frame for second vis in column 1
const FRAME2 = d3.select("#col1")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");

// read data from second file
d3.csv("data/bar-data.csv").then((data) => {

	console.log(data);

	const MAX_Y2 = d3.max(data, (d) => {return parseInt(d.amount); });

	const X_SCALE2 = d3.scaleBand()
						.domain(data.map((d) => {return d.category}))
						.range([0, VIS_WIDTH]);

	const Y_SCALE2 = d3.scaleLinear()
						.range([VIS_HEIGHT, 0])
						.domain([0, MAX_Y2])

	// plot
	FRAME2.selectAll(".bar")
					.data(data)
	    			.enter().append("rect")
	    						.attr("class", "bar")
	    						.attr("x", d => {
	    								return X_SCALE2(d.category) + MARGINS.left
	    							})
	    						.attr("y", d => {
	    							return (Y_SCALE2(d.amount) + MARGINS.bottom)
	    						})
	    						.attr("width", X_SCALE2.bandwidth())
	    						.attr("height", d => {
	    							return (VIS_HEIGHT - Y_SCALE2(d.amount))
	    						})


	});
