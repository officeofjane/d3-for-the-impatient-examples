function makeDemo2() {
  d3.tsv("examples-demo2.tsv")
    .then(function(data) {
      var pxX = 500, pxY = 350;

      var scX = d3.scaleLinear()
        .domain(d3.extent(data, d => d["x"]))
        .range([0, pxX]);

      var scY1 = d3.scaleLinear()
        .domain(d3.extent(data, d => d["y1"]))
        .range([pxY, 0]);

      var scY2 = d3.scaleLinear()
        .domain(d3.extent(data, d => d["y2"]))
        .range([pxY, 0]);

      d3.select("svg")
        .append("g").attr("id", "ds1")
        .selectAll("circle")
        .data(data).enter().append("circle")
        .attr("r", 5).attr("fill", "green")
        .attr("cx", d => scX(d["x"]))
        .attr("cy", d => scY1(d["y1"]));

      d3.select("svg")
        .append("g").attr("id", "ds2")
        .attr("fill", "blue")
        .selectAll("circle")
        .data(data).enter().append("circle")
        .attr("r", 5)
        .attr("cx", d => scX(d["x"]))
        .attr("cy", d => scY2(d["y2"]));

      var lineMaker = d3.line()
        .x(d => scX(d["x"]))
        .y(d => scY1(d["y1"]))

      d3.select("#ds1")
        .append("path")
        .attr("fill", "none").attr("stroke", "red")
        .attr("d", lineMaker(data));

      lineMaker.y(d => scY2(d["y2"]));

      d3.select("#ds2")
        .append("path")
        .attr("fill", "none").attr("stroke", "cyan")
        .attr("d", lineMaker(data));

      // d3.select("#ds2").attr("fill", "red");

    })
}