var margin = {top: 20, right: 100, bottom: 100, left: 70},
    w = window.innerWidth - 400, 
    h = 500;
var trueDim = {width: window.innerWidth, height: window.innerHeight};
var topBottom = margin.top + margin.bottom;
var leftRight = margin.left + margin.right;  
var mid = {x: w/2, y:h/2};
var barW = w/10;
var svg = d3.select("#svgDiv")
  .append("svg")
  .attr("width",w)
  .attr("height",h)
  .attr("margin","auto")
  .attr("id","chartsvg");
var backBar, bar1, bar2, line1, line2;
var eteOrange = "rgb(235,119,38)";
var eteBlue = "rgb(31,139,199)";
var sphBlue = "rgb(1,175,220)";
var blueprintYellow = "rgb(252,181,26)";
var justinGreen = "rgb(2, 207, 12)";
var bar1Color = eteOrange, bar2Color = eteBlue, line1Color = sphBlue, line2Color = blueprintYellow;
var grid = svg.append("g") //adds the gridlines
var backBar = svg.append("g") //the back rectangles
var deaths = d3.line() //deaths line
var aidsdx = d3.line() //aids diagnoses line
var hivdx = d3.line() //hiv diagnoses line
var yLegend = h-margin.bottom/2;
var tTime = 800; //transition time
var plwdhBar = svg.append("g") //the people living with hiv bar
var svgPos = document.getElementById("svgDiv");
function boxes(){
    var smallBoxMargin = {top: 20, bottom: 20, left: 20, right: 20};
    var boxH = 150;
    var smallBoxDim = {width: (trueDim.width/4) -smallBoxMargin.left-smallBoxMargin.right, height: boxH-smallBoxMargin.top-smallBoxMargin.bottom}
    var boxSvg = d3.select("#boxDiv")
      .append("svg")
      .attr("height",boxH)
      .attr("width",trueDim.width);
    var boxMidpoint = trueDim.width/2;
    var box1 = {
      number: "108,600",
      text: "People living with diagnosed HIV (PLWDHI)",
      x: boxMidpoint-2*smallBoxDim.width - 2*smallBoxMargin.right-smallBoxMargin.left
    }
    var box2 = {
      number: "3,120",
      text: "People newly diagnosed with HIV",
      x: boxMidpoint - smallBoxDim.width - smallBoxMargin.right
    }
    var box3 = {
      number: "1,475",
      text: "People newly diagnosed with AIDS",
      x: boxMidpoint+smallBoxMargin.left
    }
    var box4 = {
      number: "1,974",
      text: "Total Deaths among people living with HIV/AIDS",
      x: boxMidpoint+smallBoxDim.width+2*smallBoxMargin.left+smallBoxMargin.right
    }
    var boxes = [box1, box2, box3, box4]
    boxes.forEach((box)=>{
      var gBox = boxSvg.append("g")
        .attr("class","gBox")
      gBox.append("rect")
        .attr("class","smallBox")
        .attr("width",smallBoxDim.width)
        .attr("height",smallBoxDim.height)
        .attr("fill",eteOrange)
        .attr("x", box.x)
        .attr("y", smallBoxMargin.top)
      gBox.append("rect")
        .attr("width",smallBoxDim.width - 20)
        .attr("height",smallBoxDim.height*0.2)
        .attr("fill","white")
        .attr("x", box.x+10)
        .attr("y", smallBoxMargin.top + smallBoxDim.height - smallBoxDim.height*0.2 -10)
      gBox.append("text")
        .attr("class","boxText")
        .attr("x", box.x + 15)
        .attr("y", smallBoxMargin.top + smallBoxDim.height - smallBoxDim.height*0.2+6)
        .text(box.text)
      var bigTextMove = 110;
      if(box.number.length > 5){
        bigTextMove = 80;
      }
      gBox.append("text")
        .attr("class","boxBigText")
        .attr("x", box.x + bigTextMove)
        .attr("y", smallBoxMargin.top + smallBoxDim.height - smallBoxDim.height*0.5)
        .text(box.number)

    })
}
var name = "total";
function chart(){
    var xScale = d3.scaleLinear() //xScale
      .range([margin.left, (w-margin.right)-barW]);
    var xAxisScale = d3.scaleLinear() //used for xAxis Line
      .range([margin.left, w-margin.right]);
    var yBarScale = d3.scaleLinear() //yBar scale
      .range([h-margin.bottom, margin.top])
    var yLineScale = d3.scaleLinear() //yLine scale
      .range([h-margin.bottom, margin.top])
    var yGrid = d3.axisLeft(yLineScale) //gridLines
      .ticks(10)
      .tickSize(leftRight-w)
      .tickFormat("");
    w = window.innerWidth - 400; 
    var xAxis = d3.axisBottom(xAxisScale) //the x axis line
      .tickFormat("")
      .tickSize(0);
    var yBarAxis = d3.axisLeft(yBarScale) //yBar axis
      .ticks(10);
    var yLineAxis = d3.axisRight(yLineScale)//yLine axis
      .ticks(10);
    ///////////////////////////////////////////////////////
    ///EVERYTHING THAT NEEDS DATA
    ///////////////////////////////////////////////////////
    d3.csv("data/"+name+".csv").then(function(dataset) {
      dataset.forEach((d)=>{
        d.year = +d.year;
        d.deaths = +d.deaths;
        d.aidsdx = +d.aidsdx;
        d.hivdx = +d.hivdx
        d.plwdh = +d.plwdh
      })
      grid.attr("class","grid")//transforms the gridlines
        .attr("transform","translate("+margin.left+",0)")
        .call(yGrid);
      xScale.domain([d3.min(dataset, (d)=>d.year), d3.max(dataset, (d) =>d.year)])//domain for x scale
      xAxisScale.domain([d3.min(dataset, (d)=>d.year), d3.max(dataset, (d)=>d.year)]) //domain for x axis scale
      yBarScale.domain([0, d3.max(dataset, (d)=>d.plwdh)])
        .nice(5); //domain for the ybar scale
      yLineScale.domain([0, d3.max(dataset, (d)=>{
        return Math.max(d.aidsdx,d.deaths,d.hivdx);
      })])
        .nice(5); //domain for the y line scale
      backBar.selectAll("rectBack") //back rect
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","rectBack")
        .attr("x",(d)=>xScale((d.year)))
        .attr("width",(w)/dataset.length)
        .attr("y",margin.top)
        .attr("height",h-topBottom)
        .attr("opacity",0)
        .attr("fill","lightgrey")
        .on("mouseover",function(d){
          d3.select(this)
            .attr("opacity",0.3);
          showTooltip(d);
        })
        .on("mouseout",function(){
          d3.select(this)
            .attr("opacity",0);
          removeTooltip();
        })
      var plwdhRect = plwdhBar.selectAll("plwdhBar") //bar2
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","plwdhBar")
        .attr("width", 30)
        .attr("fill", bar2Color)
        .attr("x",(d)=>xScale(d.year)+(barW/2)-15)
        .attr("y", h-margin.bottom)
      plwdhRect.transition()
        .duration(500)
        .attr("height", (d)=>(h-yBarScale(d.plwdh)) -margin.bottom)
        .attr("y",(d)=>yBarScale(d.plwdh))
      plwdhRect.on("mouseover",function(d){
        showTooltip(d);
      })
      .on("mouseout",function(){
        removeTooltip();
      });
      deaths.x((d)=>xScale(d.year)+(barW/2)) // deaths
        .y((d)=>yLineScale(d.deaths));
      svg.append("path")
        .datum(dataset)
        .attr("class","deathsLine")
        .attr("d",deaths)
      svg.selectAll("lineDot1") //dots for deaths
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","deathsDot")
        .attr("cx",(d)=>xScale(d.year)+(barW/2))
        .attr("cy", (d)=>yLineScale(d.deaths))
        .attr("r",5)
        .attr("fill",eteOrange)
        .attr("stroke","white")
        .attr("opacity",1);  
      aidsdx.x((d)=>xScale(d.year)+(barW/2)) //aids diagnoses
        .y((d)=>yLineScale(d.aidsdx));
      svg.append("path")
        .datum(dataset)
        .attr("class","aidsdxLine")
        .attr("d",aidsdx);
      svg.selectAll("lineDot2") //dots for aidsdx
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","aidsdxDot")
        .attr("cx",(d)=>xScale(d.year)+(barW/2))
        .attr("cy", (d)=>yLineScale(d.aidsdx))
        .attr("r",5)
        .attr("opacity",1)
        .attr("stroke","white")
        .attr("fill",blueprintYellow);
      hivdx.x((d)=>xScale(d.year)+(barW/2)) //hiv diagnoses
        .y((d)=>yLineScale(d.hivdx));
      svg.append("path")
        .datum(dataset)
        .attr("class","hivdxLine")
        .attr("d",hivdx)
      svg.selectAll("lineDot3") //dots for hivdx
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","hivdxDot")
        .attr("cx",(d)=>xScale(d.year)+(barW/2))
        .attr("cy", (d)=>yLineScale(d.hivdx))
        .attr("r",5)
        .attr("opacity",1)
        .attr("stroke","white")
        .attr("fill",justinGreen);
      //////////////////////////////////
      ///AXES
      /////////////////////////////////
      svg.append("g")
        .attr("transform","translate(0,"+(h-margin.bottom)+")")
        .call(xAxis)
      svg.selectAll("year") //year labels on x axis
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","year")
        .attr("x", (d)=>(xScale(d.year))+barW/2-14)
        .attr("y", h-margin.bottom + 20)
        .text((d)=>d.year);
      svg.append("g")
        .attr("transform","translate("+margin.left+",0)")
        .transition()
        .attr("class","axis")
        .call(yBarAxis);
      svg.append("g")
        .attr("transform","translate("+(w-margin.right)+",0)")
        .transition()
        .duration(500)
        .attr("class","axis")
        .call(yLineAxis);
    })    
  function showTooltip(d){ //also adds dots for the lines
    var left = xScale(d.year) + svgPos.offsetLeft - margin.left - 20;
    left < margin.left*2 ? left += 20 + barW + 2*margin.left : left = left; 
    d3.select("body")
      .append("div")
      .attr("class","tooltip")
      .attr("opacity",1)
      .html("<h5><b>"+d.year+"</b></h5>"+"</br><h5>PLWDH: "+d.plwdh+"</h5> </br> <h5>HIV Diagnoses: "+d.hivdx+"</h5> </br> <h5>Deaths: "+d.deaths+"</h5> </br> <h5>AIDS Diagnoses: "+d.aidsdx+"</h5>")
      .style("top", yLineScale(Math.max(d.aidsdx,d.deaths,d.hivdx))+300)
      .style("left", left)
  }
  function removeTooltip(){
    d3.selectAll(".tooltip")
      .remove().exit();
  }
}
function change(value, id){
  svg.selectAll(".plwdhbar")
    .remove().exit();
  svg.selectAll("path")
    .remove().exit();
  svg.selectAll(".axis")
    .remove().exit();
  svg.selectAll(".aidsdxDot,.hivdxDot,.deathsDot,.year")
    .remove().exit()
  var groups = ["sex","ageGroup","race","risk"]
  if(value === "total"){
    groups.forEach(element =>{
      document.getElementById(element).disabled = false;
    })
  }
  else{
    groups.forEach(element => {
      if(element != id){
        document.getElementById(element).disabled = true;
      }
    });
  }
  name = value;
  chart();
}
//////////////////////////////////
///LEGEND
///////////////////////////////// 
svg.append("circle") //plwdh circle
    .attr("r",8)
    .attr("fill", eteBlue)
    .attr("transform","translate("+(mid.x-290)+","+(yLegend)+")")
    .on("mouseover",function(){
        d3.selectAll(".deathsLine,.aidsdxLine,.hivdxLine,.deathsDot,.aidsdxDot,.hivdxDot")
        .transition(tTime)
        .attr("opacity",0.3);
    })
    .on("mouseout",function(){
        d3.selectAll(".deathsLine,.aidsdxLine,.hivdxLine,.deathsDot,.aidsdxDot,.hivdxDot")
        .transition(tTime)
        .attr("opacity",1);
    });
svg.append("text") //bar1 text
    .text("People Living With Diagnosed HIV")
    .attr("transform","translate("+(mid.x-280)+","+(yLegend+4)+")")
    .on("mouseover",function(){
      d3.selectAll(".deathsLine,.aidsdxLine,.hivdxLine,.deathsDot,.aidsdxDot,.hivdxDot")
          .transition(tTime)
          .attr("opacity",0.3);
    })
    .on("mouseout",function(){
        d3.selectAll(".deathsLine,.aidsdxLine,.hivdxLine,.deathsDot,.aidsdxDot,.hivdxDot")
        .transition(tTime)
        .attr("opacity",1);
    });
function makeLegendLine(e){
  svg.append("rect")
    .attr("height",8)
    .attr("width",21)
    .attr("r",5)
    .attr("fill",e.color)
    .attr("transform",e.translate)
    .on("mouseover",function(){
      d3.selectAll(e.notClass)
        .transition(e.time)
        .attr("opacity",0.3);
      })
    .on("mouseout",function(){
      d3.selectAll(e.notClass)
        .transition(e.time)
        .attr("opacity",1);
    });
  svg.append("text")
    .text(e.text)
    .attr("transform",e.translateText)
    .on("mouseover",function(){
      d3.selectAll(e.notClass)
        .transition(e.time)
        .attr("opacity",0.3);
    })
    .on("mouseout",function(){
      d3.selectAll(e.notClass)
        .transition(e.time)
        .attr("opacity",1);
    });
}
var hivdxLegend = {
  color: justinGreen, 
  translate: "translate("+(mid.x-70)+","+(yLegend-4)+")", 
  notClass: ".aidsdxLine,.plwdhBar,.deathsLine,.deathsDot,.aidsdxDot",
  time: tTime,
  text: "HIV Diagnoses",
  translateText: "translate("+(mid.x-45)+","+(yLegend+4)+")"
}
var deathsLegend = {
  color: eteOrange, 
  translate: "translate("+(mid.x+55)+","+(yLegend-4)+")", 
  notClass: ".hivdxLine,.plwdhBar,.aidsdxLine,.aidsdxDot,.hivdxDot", 
  time: tTime, 
  text:"Deaths", 
  translateText:"translate("+(mid.x+80)+","+(yLegend+4)+")"
}  
var aidsdxLegend = {
  color: blueprintYellow, 
  translate: "translate("+(mid.x+135)+","+(yLegend-4)+")", 
  notClass: ".hivdxLine,.deathsLine,.plwdhBar,.deathsDot,.hivdxDot", 
  time: tTime, 
  text: "AIDS Diagnoses", 
  translateText: "translate("+(mid.x+160)+","+(yLegend+4)+")"
}
var legendElements = [hivdxLegend, deathsLegend, aidsdxLegend];
legendElements.forEach((e)=>makeLegendLine(e));
//////////////////////////////////
///AXIS LABELS
/////////////////////////////////
svg.append("text") //y1 axis
  .attr("transform","rotate(-90)")
  .attr("y",0)
  .attr("x",-h/2-margin.top-10)
  .attr("dy","1em")
  .text("People Living with Diagnosed HIV");
svg.append("text")
  .attr("transform","rotate(90)")
  .attr("y",-w+margin.right)
  .attr("x", h/2+margin.top-210)
  .attr("dy","-4.5em")
  .text("Number of New HIV/AIDS Diagnoses and Deaths");