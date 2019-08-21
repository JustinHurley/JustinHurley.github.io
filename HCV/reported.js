//many thanks to D3 Tips and Tricks v4.x by Malcolm Maclean for all the help with making graphs and such
var margin = {top: 30, right: 70, bottom: 100, left: 70},
  w = 900;
  h = 500;
var topBottom = margin.top + margin.bottom;
var leftRight = margin.left + margin.right;  
var mid = {x: w/2, y:h/2};
var svg = d3.select("#svgDiv")
  .append("svg")
  .attr("width",w)
  .attr("height",h)
  .attr("margin","auto"); 
var eteOrange = "rgb(235,119,38)";
var eteBlue = "rgb(31,139,199)";
var sphBlue = "rgb(1,175,220)";
var blueprintYellow = "rgb(252,181,26)";
var justinGreen = "rgb(2,207,12)";
var svg = d3.select("#reportedSVG")
  .append("svg")
  .attr("width",w)
  .attr("height",h);
var svg2 = d3.select("#reportedSVG")
	.append("svg")
	.attr("height",h)
	.attr("width",w);
var yScale;
var xScale;
var colorScale;
var xAxScale;
var lineScaleX, lineScaleY, line;
var data = "data", globalRate = "none";
svg.append("text") //adds the y-axis labels
  .attr("transform","translate("+(w/2)+","+(h-60)+")")
  .style('text-anchor', 'middle')
  .text("Year");
svg.append("text") //adds the y-axis labels
  .attr("transform", "rotate(-90)")
  .style("text-anchor", "middle")
  .attr("y", 0)
  .attr("x",-h/2+20)
  .attr("dy", "1em")
  .text("Reported HCV Cases");
function all(data) {
  barW = (w-leftRight)/15;
  svg.selectAll(".bar") //deletes old rectangles
    .remove()
    .exit();
  svg.selectAll("rect")
    .remove()
    .exit();
  svg.selectAll(".rateText")
    .remove()
    .exit();
  svg.selectAll(".grid")
    .remove()
    .exit();
  svg.selectAll(".axis")
    .remove()
    .exit();
  xScale = d3.scaleLinear()
    .range([margin.left, w-margin.left-barW]);
  yScale = d3.scaleLinear()
    .range([h-margin.bottom, margin.top]);
  xAxScale = d3.scaleLinear()
    .range([margin.left, w-margin.right]);
  lineScaleY = d3.scaleLinear() 
    .range([h-margin.bottom, margin.top]);
  colorScale = d3.scaleLinear()
    .interpolate(d3.interpolateHcl)
    .range([eteBlue,eteBlue]);
  d3.csv("Data/"+data+".csv",(dataset)=>{
    dataset.forEach((d)=>{
      d.year = +d.year;
      d.reported = +d.reported;
      d.crude = +d.crude;
      d.ageAdj = +d.ageAdj;
    });
    // makes the scales based on the various data ranges to format the bars
    xScale.domain([d3.min(dataset, (d)=>d.year), d3.max(dataset, (d)=>d.year)]);
    yScale.domain([0, d3.max(dataset, (d)=>d.reported)]).nice(10);
    colorScale.domain([d3.min(dataset, (d)=>d.reported), d3.max(dataset, (d)=>d.reported)]).nice(10);
    xAxScale.domain([d3.min(dataset, (d)=>d.year), d3.max(dataset, (d)=>d.year)]
    );
    lineScaleY.domain([0, d3.max(dataset, (d)=>d.crude)]).nice(10);
    function yGrid(){
      return d3.axisLeft(yScale)
        .ticks(10);
    }
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate("+(margin.left-1)+",0)")
      .call(yGrid()
      .tickSize(leftRight-w)
        .tickFormat("")
      );
    var bar = svg.append("g");
    bar.selectAll("rect") //appends the rectangles to the svg, using the scales made
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x",(d)=>(xScale(d.year)))
      .attr("y",(d)=>(yScale(d.reported)))
      .attr("width",barW)
      .attr("height",(d)=>(h-yScale(d.reported)-margin.bottom))
      .attr("fill", function(d){
          return colorScale(d.reported)
      })
      .attr("class","bar")
      .on("mouseover",(d)=>{
          var group = svg.append("g")
            .attr("class","tooltip")
          var toolReport = {
            y: 30,
            text: "Reported: "+d.reported
          }
          var toolCrude = {
            y: 15,
            text: "Crude Rate: "+d.crude
          }
          var toolAge = { 
            y: 0,
            text: ()=>(isNaN(d.ageAdj) ? "Age Adjusted Rate: N/A" : "Age Adjusted Rate: "+d.ageAdj)
          }
          var toolYear = {
            y: 45,
            text: d.year
          }
          var toolTipText = [toolYear, toolReport, toolCrude, toolAge]
          var xTip = 60;
          if(xScale(d.year)+xTip > w-160){
            xTip = -100;
          }
          group.append("rect")
            .attr("x",xScale(d.year)+xTip-10)
            .attr("y",yScale(d.reported)-60)
            .attr("width","135px")
            .attr("height","70px")
            .attr("fill","lightgrey")
            .attr("opacity","0.7")
          toolTipText.forEach((tool)=>{
            group.append("text")
            .attr("class","tooltip")
            .attr("x",xScale(d.year)+xTip)
            .attr("y",yScale(d.reported) - tool.y)
            .text(tool.text);
          })
      })
      .on("mouseout",()=>{
          svg.selectAll(".tooltip")
            .remove()
            .exit();
      })
    svg.selectAll(".year")  //adds text for each year (basically the x axis)
      .data(dataset)
      .enter()
      .append("text")
      .attr("class","year")
      .attr("x", (d)=>(xScale(d.year))+barW/4)
      .attr("y", h-margin.bottom+15)
      .text((d)=>d.year)
      .attr("font-size","12px")
      .attr("font-weight","bold");
		var yAxis = d3.axisLeft(yScale) 
			.ticks(10);
    var xAxis = d3.axisBottom(xAxScale)
      .tickFormat("")
      .tickSize(0);
    svg.append("g") 
      .attr("class","axis")
      .attr("transform","translate("+(margin.left-1)+",0)")
      .call(yAxis)
      .style("fill","none");
    svg.append("g") 
      .attr("class","axis")
      .attr("transform","translate(0,"+(h-margin.bottom)+")")
      .call(xAxis);
  });   
}
//this function does the actual updating and adding of the line graph and axes when called
function addLine(rate){
  globalRate = rate;
  console.log(globalRate);
  svg.selectAll(".dot")
		.remove()
    .exit();
  svg.selectAll(".lineChart") 
		.remove()
    .exit();
  svg.selectAll(".rightY")
    .remove()
    .exit();
	if(globalRate != "none"){
    var lineYAxis = d3.axisRight(lineScaleY)
			.ticks(10);
    svg.append("text") //adds the y-axis labels
      .attr("class","rightY")
      .attr("transform", "rotate(90)")
      .style("text-anchor","middle")
      .attr("y", -w+margin.right)
      .attr("x", h/2-10)
      .attr("dy","-2.5em")
      .text("Rate per 100,000");
    svg.append("g") //adds the y-axis labels
			.attr("transform","translate("+(w-margin.right)+",0)")
			.attr("class","axis")
			.call(lineYAxis);
		d3.csv("Data/"+data+".csv", (dataset)=>{
			dataset.forEach((d)=>{
				d.year = +d.year;
				d.reported = +d.reported;
				d.crude = +d.crude;
				d.ageAdj = +d.ageAdj;
			});
			lineScaleY = d3.scaleLinear()
				.domain([0, d3.max(dataset, (d)=>d.crude)])
				.nice(8)
				.range([h-margin.bottom, margin.top]);
			line = d3.line()
        .x((d)=>xScale(d.year)+barW/2)
        .y((d)=>{
          if(rate === "crude") return lineScaleY(d.crude);
          if(rate === "ageAdj") return lineScaleY(d.ageAdj);
        });
			svg.append("path")
				.datum(dataset)
				.attr("class","lineChart")
				.attr("d",line);
			svg.selectAll("dot")
				.data(dataset)
				.enter()
				.append("circle")
				.attr("class","dot")
				.attr("cx",(d)=>xScale(d.year) + barW/2)
				.attr("cy",(d)=>{
					if(rate === "crude"){
            document.getElementById("ageGroup").disabled = false;
            return lineScaleY(d.crude)
          }  
					if(rate === "ageAdj"){
						document.getElementById("ageGroup").disabled = true;
						return lineScaleY(d.ageAdj);
					} 
				})
				.attr("r",4);
    });
  }
  else{
    document.getElementById("ageGroup").disabled = false;
  }
}
function change(id, newData){
  if(id != "data"){
    if(newData === "sex"){
      document.getElementById("ageGroup").disabled = true;
      document.getElementById("borough").disabled = true;
    }
    else if(newData === "ageGroup"){
      document.getElementById("sex").disabled = true;
      document.getElementById("borough").disabled = true;
      document.getElementById("ageAdjRate").disabled= true;
    }
    else if(newData === "borough"){
      document.getElementById("sex").disabled = true;
      document.getElementById("ageGroup").disabled = true;
    }
    all(id);
  }
  else{
    document.getElementById("ageGroup").disabled = false;
    document.getElementById("borough").disabled = false;
    document.getElementById("sex").disabled = false;
    document.getElementById("ageAdjRate").disabled= false;
    all(id);
  }
}

