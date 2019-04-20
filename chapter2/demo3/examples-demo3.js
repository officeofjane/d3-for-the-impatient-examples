function makeDemo3() {
  d3.tsv("examples-demo3.tsv")
    .then(function(data) {
      var svg = d3.select("svg");

      var pxX = svg.attr("width");
      var pxY = svg.attr("height");

      var scMkr = function (accessor, range) {
        return d3.scaleLinear()
          .domain(d3.extent(data, accessor))
          .range(range).nice();
      };

      var scX = scMkr(d => d["x"], [0, pxX]);
      var scY1 = scMkr(d => d["y1"], [pxY, 0]);
      var scY2 = scMkr(d => d["y2"], [pxY, 0]);

      var ptMkr = function (id, accessor, color) {
        svg.append("g").attr("id", id)
          .selectAll("circle")
          .data(data).enter().append("circle")
          .attr("r", 5).attr("fill", color)
          .attr("cx", d => scX(d["x"]))
          .attr("cy", accessor)
      };

      ptMkr("ds1", d => scY1(d["y1"]), "green");
      ptMkr("ds2", d => scY2(d["y2"]), "blue");

      var lnMkr = function (selector, accessor, curve, color) {
        var dStr = d3.line().x(d => scX(d["x"])).y(accessor)
                    .curve(curve);
        
        d3.select(selector).append("path")
          .attr("fill", "none").attr("stroke", color)
          .attr("d", dStr(data))
      }

      lnMkr("#ds1", d => scY1(d["y1"]), d3.curveStep, "cyan");
      lnMkr("#ds2", d => scY2(d["y2"]), d3.curveNatural, "red");

      var axMkr = d3.axisRight(scY1);
      axMkr(svg.append("g"));

      axMkr = d3.axisLeft(scY2);
      svg.append("g").attr("transform", "translate(500, 0)")
        .call(axMkr);

      svg.append("g").call(d3.axisTop(scX))
        .attr("transform", "translate(0, 350)");

    })
}