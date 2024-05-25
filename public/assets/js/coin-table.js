document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/cmc/quotes")
    .then((response) => response.json())
    .then((data) => populateTable(data))
    .catch((error) => console.error("Error fetching data:", error));
});

function populateTable(data) {
  const tableBody = document.getElementById("coin-table");
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const crypto = data[key];
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = crypto.id || "-";
      row.appendChild(idCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = crypto.name || "-";
      row.appendChild(nameCell);

      // Create and append coin logo image
      const logoCell = document.createElement("td");
      if (crypto.logo) {
        const logoImg = document.createElement("img");
        logoImg.src = crypto.logo;
        logoImg.alt = crypto.name;
        logoImg.classList.add("avatar");
        logoCell.appendChild(logoImg);
      }
      row.appendChild(logoCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = crypto.price ? crypto.price.toFixed(2) : "-";
      row.appendChild(priceCell);

      const change1hCell = document.createElement("td");
      if (crypto.percent_change_1h) {
        const change1h = crypto.percent_change_1h.toFixed(2);
        const arrowClass =
          change1h > 0
            ? "text-success fw-semibold"
            : change1h < 0
            ? "text-danger fw-semibold"
            : "";
        const arrowIcon =
          change1h > 0
            ? '<i class="bx bx-up-arrow-alt"></i>'
            : change1h < 0
            ? '<i class="bx bx-down-arrow-alt"></i>'
            : "";
        change1hCell.innerHTML = `<span class="${arrowClass}">${change1h}% ${arrowIcon}</span>`;
      } else {
        change1hCell.textContent = "-";
      }
      row.appendChild(change1hCell);

      const change24hCell = document.createElement("td");
      if (crypto.percent_change_24h) {
        const change24h = crypto.percent_change_24h.toFixed(2);
        const arrowClass =
          change24h > 0
            ? "text-success fw-semibold"
            : change24h < 0
            ? "text-danger fw-semibold"
            : "";
        const arrowIcon =
          change24h > 0
            ? '<i class="bx bx-up-arrow-alt"></i>'
            : change24h < 0
            ? '<i class="bx bx-down-arrow-alt"></i>'
            : "";
        change24hCell.innerHTML = `<span class="${arrowClass}">${change24h}% ${arrowIcon}</span>`;
      } else {
        change24hCell.textContent = "-";
      }
      row.appendChild(change24hCell);

      const change7dCell = document.createElement("td");
      if (crypto.percent_change_7d) {
        const change7d = crypto.percent_change_7d.toFixed(2);
        const arrowClass =
          change7d > 0
            ? "text-success fw-semibold"
            : change7d < 0
            ? "text-danger fw-semibold"
            : "";
        const arrowIcon =
          change7d > 0
            ? '<i class="bx bx-up-arrow-alt"></i>'
            : change7d < 0
            ? '<i class="bx bx-down-arrow-alt"></i>'
            : "";
        change7dCell.innerHTML = `<span class="${arrowClass}">${change7d}% ${arrowIcon}</span>`;
      } else {
        change7dCell.textContent = "-";
      }
      row.appendChild(change7dCell);

      const marketCapCell = document.createElement("td");
      marketCapCell.textContent = crypto.market_cap
        ? crypto.market_cap.toLocaleString("en")
        : "-";
      row.appendChild(marketCapCell);

      const volume24h = document.createElement("td");
      volume24h.textContent = crypto.volume_24h
        ? crypto.volume_24h.toLocaleString("en")
        : "-";
      row.appendChild(volume24h);

      // Add the graph cell
      const graphCell = document.createElement("td");
      const graphDiv = document.createElement("div");
      graphDiv.id = `chart-${crypto.id}`; // Unique ID for each chart
      graphCell.appendChild(graphDiv);
      row.appendChild(graphCell);

      tableBody.appendChild(row);

      // Initialize the ApexChart
      var options = {
        series: [{
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
        chart: {
        width:250,
        height: 180,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
      };
      

      const chart = new ApexCharts(document.querySelector(`#chart-${crypto.id}`), options);
      chart.render();
    }
  }
}
