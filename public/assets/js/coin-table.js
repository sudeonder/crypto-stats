document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/cmc/quotes")
    .then((response) => response.json())
    .then(populateTable)
    .catch((error) => console.error("Error fetching data:", error));
});

function populateTable(data) {
  const tableBody = document.getElementById("coin-table");
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const crypto = data[key];
      const row = createRow(crypto);
      tableBody.appendChild(row);
    }
  }
}

function createRow(crypto) {
  const row = document.createElement("tr");
  row.appendChild(createCell(crypto.id || "-"));
  row.appendChild(createCell(crypto.name || "-"));
  row.appendChild(createLogoCell(crypto.logo, crypto.name));
  row.appendChild(createCell(crypto.price ? crypto.price.toFixed(2) : "-"));
  row.appendChild(createChangeCell(crypto.percent_change_1h));
  row.appendChild(createChangeCell(crypto.percent_change_24h));
  row.appendChild(createChangeCell(crypto.percent_change_7d));
  row.appendChild(
    createCell(crypto.market_cap ? crypto.market_cap.toLocaleString("en") : "-")
  );
  row.appendChild(
    createCell(crypto.volume_24h ? crypto.volume_24h.toLocaleString("en") : "-")
  );
  const graphCell = createGraphCell(crypto.id);
  row.appendChild(graphCell);
  return row;
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createLogoCell(logo, name) {
  const cell = document.createElement("td");
  if (logo) {
    const logoImg = document.createElement("img");
    logoImg.src = logo;
    logoImg.alt = name;
    logoImg.classList.add("avatar");
    cell.appendChild(logoImg);
  }
  return cell;
}

function createChangeCell(change) {
  const cell = document.createElement("td");
  if (change !== undefined) {
    const changeText = change.toFixed(2);
    const arrowClass =
      change > 0
        ? "text-success fw-semibold"
        : change < 0
        ? "text-danger fw-semibold"
        : "";
    const arrowIcon =
      change > 0
        ? '<i class="bx bx-up-arrow-alt"></i>'
        : change < 0
        ? '<i class="bx bx-down-arrow-alt"></i>'
        : "";
    cell.innerHTML = `<span class="${arrowClass}">${changeText}% ${arrowIcon}</span>`;
  } else {
    cell.textContent = "-";
  }
  return cell;
}

function createGraphCell(id) {
  const cell = document.createElement("td");
  const graphDiv = document.createElement("div");
  graphDiv.id = `chart-${id}`;
  cell.appendChild(graphDiv);
  renderChart(graphDiv, id);
  return cell;
}

function renderChart(graphDiv, id) {
  const dummyData = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100));

  var options = {
    series: [
      {
        name: "7 day",
        data: dummyData,
      },
    ],
    chart: {
      width: 250,
      height: 150,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };
  const chart = new ApexCharts(graphDiv, options);
  chart.render();
}
