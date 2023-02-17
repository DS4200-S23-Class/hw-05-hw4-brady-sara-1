/* homework 5
Sara & Brady */

// declare constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
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
						.domain([0, MAX_X + 1])
	    				.range([0, VIS_WIDTH]);

	// range has to go from big to small so that 
	// the data is flipped along the y-axis (how a user would be 
	//  used to seeing a plot)
	const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_Y + 1])
	    				.range([VIS_HEIGHT, 0]);

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
      			.call(d3.axisBottom(X_SCALE));

	// create y-axis
	FRAME1.append("g")
      		.attr("transform", "translate(" + 
      			MARGINS.left + "," + (MARGINS.top) + ")")
      		.call(d3.axisLeft(Y_SCALE));



});