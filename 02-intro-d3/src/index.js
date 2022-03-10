import * as d3 from "d3";

// C'est ici que vous allez écrire les premières lignes en d3!
// const circle = document.createElement("div");
// circle.className = "svg";
// document.body.appendChild(circle);
const WIDTH = "100vw";
const HEIGHT = "100vh";

const svg = d3
	.select("body")
	.append("svg")
	.attr("width", WIDTH)
	.attr("height", HEIGHT)
	.attr("id", "svg");

const circle1 = d3
	.select("#svg")
	.append("g")
	.append("circle")
	.attr("cx", "100")
	.attr("cy", "50")
	.attr("r", "40");

const circle2 = d3
	.select("#svg")
	.append("g")
	.append("circle")
	.attr("cx", "250")
	.attr("cy", "150")
	.attr("r", "40")
	.attr("fill", "red");

const circle3 = d3
	.select("#svg")
	.append("g")
	.append("circle")
	.attr("cx", "250")
	.attr("cy", "250")
	.attr("r", "40");

const circles = [circle1, circle2, circle3];
circle3.on("click", () => {
	circles.forEach((circle) => {
		circle.attr("cx", "250");
	});
});

const groups = d3.selectAll("g");
const data = [1, 2, 3];
groups.each(function () {
	const circle = d3.select(this).select("circle");
	const x = parseInt(circle.attr("cx"));
	const y = parseInt(circle.attr("cy"));
	const r = parseInt(circle.attr("r"));
	const text = "Hello world";
	const text_length = text.length;
	console.log(text_length);
	d3.select(this)
		.append("text")
		.attr("x", x - text_length * 3)
		.attr("y", y + r + 15)
		.text(text);
});

const width = [20, 5, 25, 8, 15];

const body = d3.select("body");
const chart = body.append("div");
chart.style("display", "flex");
chart.style("gap", "20px");
chart.style("align-items", "end");

chart
	.selectAll("div")
	.data(width)
	.enter()
	.append("div")
	.style("height", (w) => {
		return `${w}rem`;
	})
	.style("width", "20px")
	.style("background", "red");
