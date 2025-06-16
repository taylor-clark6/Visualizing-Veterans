const margin = { top: 40, right: 20, bottom: 50, left: 60 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

let data;

const color = d3.scaleOrdinal()
  .domain(["Male", "Female"])
  .range(["steelblue", "indianred"]);

d3.csv("VetPop2023_National_Estimates_by_Sex_and_Age_Groups_2000_to_2023_CLEANED.csv", d3.autoType).then(rawData => {
  data = rawData;
  updateChart("2000");

  d3.select("#year-slider").on("input", function () {
    d3.select("#year-label").text(this.value);
    updateChart(this.value);
  });
});

function updateChart(selectedYear) {
  const filtered = data.filter(d => d.Year == selectedYear);
  const ageGroups = Array.from(new Set(filtered.map(d => d["Age Group"]))).sort();
  const sexes = ["Male", "Female"];

  const groupedData = d3.groups(filtered, d => d["Age Group"]);

  const x0 = d3.scaleBand()
    .domain(ageGroups)
    .range([0, width])
    .paddingInner(0.1);

  const x1 = d3.scaleBand()
    .domain(sexes)
    .range([0, x0.bandwidth()])
    .padding(0.05);

  const y = d3.scaleLinear()
    .domain([0, d3.max(filtered, d => d.Population)]).nice()
    .range([height, 0]);

  svg.selectAll("*").remove();

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x0))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("g")
    .selectAll("g")
    .data(groupedData)
    .join("g")
    .attr("transform", d => `translate(${x0(d[0])},0)`)
    .selectAll("rect")
    .data(d => d[1])
    .join("rect")
    .attr("x", d => x1(d.Sex))
    .attr("y", d => y(d.Population))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - y(d.Population))
    .attr("fill", d => color(d.Sex));

  // Legend
  svg.selectAll(".legend")
    .data(sexes)
    .enter()
    .append("text")
    .attr("x", width - 100)
    .attr("y", (d, i) => i * 20)
    .text(d => d)
    .style("fill", d => color(d))
    .style("font-size", "12px");
}