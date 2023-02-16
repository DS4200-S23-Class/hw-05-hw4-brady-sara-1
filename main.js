/* homework 5
Sara & Brady */

// declare constants
const FRAME_HEIGHT = 200;
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

	// find the max x and y
	const MAX_X = d3.max(data, (d) => {
						return parseInt(d.x)
		});
	
	// scaling function
	const SCALE = d3.scaleLinear()
						.domain([0, MAX_X])
						.range([0, VIS_WIDTH])

	// plot
	// NOT WORKING RIGHT NOW :( only 3 points are showing					
	FRAME1.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => {
					return (SCALE(parseInt(d.x)) + MARGINS.left)
				})
				.attr("cy", (d) => {
					return (FRAME_HEIGHT - SCALE(parseInt(d.y)) + MARGINS.top)

				})
				.attr("r", 10)
				.attr("class", "point");
				
})