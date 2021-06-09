//===============Responsive Function 
d3.select(window).on("resize", handleResize);

// When the browser loads, loadChart() is called
loadChart();

function handleResize() {
  var svgArea = d3.select("svg");

  // If there is already an svg container on the page, remove it and reload the chart
  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }
}

function loadChart() {
    // ===========Set Height, Width and Margins
    var svgHeight = 650;
    var svgWidth = 850;
    var margin = {
        top: 30,
        right: 50,
        bottom: 120,
        left: 80
    };
    
    // ===========Create chart area
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // ******Test that the settings are working******
    console.log("Height: ", height);
    console.log("Width: ", width);

    //============Create SVG container
    var svg = d3.select("#scatter2").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // ===========Append SVG group
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ============================================================================
    // ===========Functions =======================================================
   
    var chosenXAxis = "age";
    var chosenYAxis = "avg_glucose_level";

    // ==========xScale and yScale
    function xScale(strokeData, chosenXAxis) {
        var xLinearScale = d3.scaleLinear()
        .domain([d3.min(strokeData, d => d[chosenXAxis]),
            d3.max(strokeData, d => d[chosenXAxis])
        ])
        .range([0, width])
        .nice();

        return xLinearScale;
    }

    function yScale(strokeData, chosenYAxis) {
        var yLinearScale = d3.scaleLinear()
        .domain([d3.max(strokeData, d => d[chosenYAxis]),
            d3.min(strokeData, d => d[chosenYAxis])
        ])
        .rangeRound([height, 0])
        .nice();

        return yLinearScale;
    }

    // updating xAxis and yAxis variable upon click on axis label
    function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);
  
        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);
  
        return xAxis;
    }

    function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
  
        yAxis.transition()
            .duration(1000)
            .call(leftAxis);
  
        return yAxis;
    }

    // function used for updating circles group with a transition to
    // new circles on X and Y axis
    function renderXCircles(circleGroup, newXScale, chosenXAxis) {
        circleGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]));
  
        return circleGroup;
    }

    function renderYCircles(circleGroup, newYScale, chosenYAxis) {
        circleGroup.transition()
            .duration(1000)
            .attr("cy", d => newYScale(d[chosenYAxis]));
  
        return circleGroup;
    }

    
     // ==========Text  for circles   
     function renderXText(circleGroup, newXScale, chosenXAxis) {
        circleGroup.transition()
        .duration(1000)
        .attr("dx", d => newXScale(d[chosenXAxis]));
    
        return circleGroup;
    }
    
    function renderYText(circleGroup, newYScale, chosenYAxis) {
        circleGroup.transition()
        .duration(1000)
        .attr("dy", d => newYScale(d[chosenYAxis]));
    
        return circleGroup;
    }

    // =================Update Tooltips - labels and tip
    function updateToolTip(circleGroup, chosenXAxis, chosenYAxis) {
        var xlabel = "";
        if (chosenXAxis === "age") {
            xlabel = "Age: ";
        }

        var ylabel = "";
        if(chosenYAxis === "avg_glucose_level") {
            ylabel = "Glucose Level (avg): ";
        }
        else if (chosenYAxis === "bmi") {
            ylabel = "BMI: ";
        }

        // ==============Update tool function
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return(`${xlabel}${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`)
            });

        circleGroup.call(toolTip);

        circleGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
        })
            .on("mouseout", function(d) {
                toolTip.hide(d);
            });

        return circleGroup;
    }

    // =================================================================================
    // ===============Retrieving data & Parse data======================================
    d3.csv("/static/assets/stroke_clean.csv").then(function(strokeData, err) {
        // /static/assets/heart_clean.csv
        // static/assets/stroke_clean.csv
        if (err) throw err;

        //parse data
        strokeData.forEach(function(data) {
            data.age = +data.age;
            data.avg_glucose_level = +data.avg_glucose_level;
            data.bmi = +data.bmi;
        });

        // ******Testing strokeData loaded******
        console.log("strokeData: ", strokeData);
    
        // Repeat Linear functions from above retrieval
        var xLinearScale = xScale(strokeData, chosenXAxis);
        var yLinearScale = yScale(strokeData, chosenYAxis);
       

         // ==========Create Axis
         var bottomAxis = d3.axisBottom(xLinearScale);
         var leftAxis = d3.axisLeft(yLinearScale);

        // =============Append x and y plus the circles (scatterplot)
        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        var yAxis = chartGroup.append("g")
            .call(leftAxis);

        // ===========Circles created on chart

        var circleGroup = chartGroup.selectAll("g circle")
            .data(strokeData)
            .enter()
            .append("g");
        
        var placeCircle = circleGroup.append("circle")
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d[chosenYAxis]))
            .attr("r", 15)
            .attr("fill", "red")
            .attr("opacity", ".5")
                
        // =============Add labels circles (scatterplot)
        var circleText = circleGroup.append("text")
            .text(d => d.age)
            .attr("dx", d => xLinearScale(d[chosenXAxis]))
            .attr("dy", d=> yLinearScale(d[chosenYAxis]))
            .attr("font-size", "11px")
            .attr("fill", "black")
            .attr("text-anchor", "middle");

        // Creat group for three x-axis labels
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var agelabel = labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "age")
            .classed("active", true)
            .text("Age ");

        // Create group for three y-axis labels
        var ylabelsGroup = chartGroup.append("g");

        var glucoselabel = ylabelsGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", 0 - (height / 2))
            .attr("value", "avg_glucose_level")
            .classed("active", true)
            .text("Glucose Level (avg) ");
        
        var bmilabel = ylabelsGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", 0 - (height / 2))
            .attr("value", "bmi")
            .classed("inactive", true)
            .text("BMI");

        var circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

        //x axis labels event listener
        labelsGroup.selectAll("text").on("click", function() {
            var value = d3.select(this).attr("value");

            if (value !== chosenXAxis) {
            chosenXAxis = value;
            }

            xLinearScale = xScale(strokeData, chosenXAxis);
            xAxis = renderXAxes(xLinearScale, xAxis);
            placeCircle = renderXCircles(placeCircle, xLinearScale, chosenXAxis);
            circleText = renderXText(circleText, xLinearScale, chosenXAxis);
            circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

            //Changes classes to change bold text
            if (chosenXAxis === "age") {
                agelabel
                    .classed("active", true)
                    .classed("inactive", false);
                }
            })
        // y axis labels event listener
        ylabelsGroup.selectAll("text").on("click", function() {
            var value = d3.select(this).attr("value");

            if (value !== chosenYAxis) {
                    chosenYAxis = value;
            }

            yLinearScale = yScale(strokeData, chosenYAxis);
            yAxis = renderYAxes(yLinearScale, yAxis);
            placeCircle = renderYCircles(placeCircle, yLinearScale, chosenYAxis);
            circleText = renderYText(circleText, yLinearScale, chosenYAxis);
            circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

             //Changes classes to change bold text
             if (chosenYAxis === "avg_glucose_level") {
                glucoselabel
                    .classed("active", true)
                    .classed("inactive", false);
                bmilabel
                    .classed("active", false)
                    .classed("inactive", true);
                }
            else {
                glucoselabel
                    .classed("active", false)
                    .classed("inactive", true);
                bmilabel
                    .classed("active", true)
                    .classed("inactive", false);
                }
            })

          
            strokeData.forEach(myFunction);
            function myFunction(item, index) {
            document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
            }

            var age = strokeData.age;
            console.log("age:", strokeData.age);
        
            var sum = 0;
            var age_0_to_20 = [];
            var age_21_to_40 = [];
            var age_41_to_60 = [];
            var age_61_to_80 = [];
            var age_81_to_100 = [];

            for (var i = 0; i < age.length; i++) {
                var ages = age[i];
                    sum += ages;

                if (age < 21) {
                    age_0_to_20.push(ages)
                }
                else if (age < 41 && age > 20) {
                    age_21_to_40.push(ages)
                }
                else if (age < 61 && age > 40) {
                    age_41_to_60.push(ages)
                }
                else if (age < 81 && age > 61) {
                    age_61_to_80.push(ages)
                }
                else {
                    age_81_to_100.push(ages)
                }

            var sum_age_0_to_20 = age_0_to_20.length;
            var sum_age_21_to_40 = age_21_to_40.length;
            var sum_age_41_to_60 = age_41_to_60.length;
            var sum_age_61_to_80 = age_61_to_80.length;
            var sum_age_81_to_100 = age_81_to_100.length;

            console.log(sum_age_0_to_20);
            console.log(sum_age_21_to_40);
            console.log(sum_age_41_to_60);
            console.log(sum_age_61_to_80);
            console.log(sum_age_81_to_100);

            var dropdown = d3.select("#dropdown");

         
            }
    
            
        }).catch(function(error) {
            console.log(error);
    }); 
}
