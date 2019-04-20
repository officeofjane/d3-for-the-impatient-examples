function makeDemo1() {
  d3.tsv("examples-demo1.tsv")
    .then(function(data) {
      console.log(data)
      d3.select("svg")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5).attr("fill", "red")
        .attr("cx", function(d) { return d["x"] })
        .attr("cy", function(d) { return d["y"] });
    });
}