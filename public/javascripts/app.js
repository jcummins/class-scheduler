/* 
 * TODO: Data integrity checks
 * - Ensure meetingtimes not overnight
 * - Ensure meetingtimes do not overlap in same course
 * - Ensure no course ID conflicts
 */

/* 
 * TODO: JSON Data loading Async
 * - Load json with d3. If error, call CB:error(error, json)
 * - Loop through data
 * - Accept a error callback
 * - Accept a loaded callback
 * - Initial data load using defined, sane schema
 * - Parse dates/times to JS Date objects using moment.js
 * - Run data integrity checks
 * - Call the relevant callback
 */

// Our data
/* var data = [4, 60, 8, 15, 16, 23, 42,80,22,44,56,75,35]; */

/* Create our svg drawing pane
 *  Append a group to add padding
 */

if(errors.length>0)
{
    alert('ERROR: ' + errors[0]);
} else {
    alert("Things went well.");
}
/*
var w = 450;
var h = 30* data.Courses.length+50;
var chart = d3.select("body").append("div").append("svg")
    .style("text-rendering", "optimizeLegibility")
    .style("font","12px Arial")
    .style("background","black")
    .attr("class", "chart")
    .attr("width", w)
    .attr("height", h)
    .append("g")
        .attr("transform", "translate(15,15)");

// Create a linear scale so that elements don't overlap
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

// Create another linear scale, color our bars
var color = d3.scale.linear()
    .domain([d3.min(data), d3.mean(data), d3.max(data)])
    .range(["white", "yellow", "red"]);

// Create an axis off of the x scale
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

// Add the bars to our pane
chart.selectAll("rect")
        .data(data)
    .enter().append("rect")
        .style('fill',color)
        .style('stroke','white')
        .attr("y", function(d, i) { return (i * 30); })
        .attr("x",0)
        .attr("width", x)
        .attr("height", 20)
        .attr("stroke-width",0)

// Add text to our bars
chart.selectAll("text")
        .data(data)
    .enter().append("text")
        .style("font","18px Arial")
        .style("font-weight","bold")
        .attr("y", function(d, i) { return (i * 30+1)+10; })
        .attr("x", 3)
        .attr("dy", ".35em") // vertical-align: middle
        .text(function(d) { return d });

// Add an axis
chart.append('g')
        .attr("class","axis")
        .attr("transform", "translate(0," + (h-40) + ")")
        .style("stroke","white")
        .call(xAxis);

/* Create a download link for our svg
 *  credit: http://nesterko.com/blog/?p=574
 * Does not work in IE...

var html = d3.select("svg")
        .attr("title", "test2")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
d3.select("body").append("div")
        .attr("id", "download")
        .append("a")
        .attr("href", "data:image/svg+xml;base64,"+ btoa(html))
        .text("Save Snapshot");

        */