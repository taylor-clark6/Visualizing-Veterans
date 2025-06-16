# U.S. Veteran Population Visualization (2000–2023)

This interactive D3.js visualization shows changes in the U.S. veteran population from 2000 to 2023, broken down by **age group** and **sex**. Users can explore how the demographic distribution of living veterans has evolved using a year slider.

**Live Demo:** [View the visualization here](https://taylor-clark6.github.io/Visualizing-Veterans/)

---

## Features

- Year slider (2000–2023)
- Grouped bar chart: each age group shows both **Male** and **Female** populations
- Color-coded bars: blue for Male, red for Female
- Dynamic updates on interaction (built with D3.js)

---

## Dataset

- **Source:** [VetPop2023 – National Estimates by Sex and Age Group](https://catalog.data.gov/dataset/vetpop2023-national-estimates-by-sex-and-age-groups-2000-to-2023)
- **Fields:** `Sex`, `Age Group`, `Year`, `Population`
- Data was reshaped from wide to long format using Excel Power Query

---

## Tech Stack

- [D3.js v7](https://d3js.org/)
- HTML5, CSS3, JavaScript
- Hosted via [GitHub Pages](https://pages.github.com/)