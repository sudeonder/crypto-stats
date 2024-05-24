document.addEventListener('DOMContentLoaded', () => {
    console.log("fROG!!")
    fetch('/api/cmc/quotes')
      .then(response => response.json())
      .then(data => populateTable(data))
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function populateTable(data) {
    console.log("fFROG!!");
    const tableBody = document.getElementById('coin-table');
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const crypto = data[key];
        const row = document.createElement('tr');
  
        const idCell = document.createElement('td');
        idCell.textContent = crypto.id || '-';
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = crypto.name || '-';
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = crypto.price ? crypto.price.toFixed(2) : '-';
        row.appendChild(priceCell);
  
        const change1h = document.createElement('td');
        change1h.textContent = crypto.price ? crypto.percent_change_1h.toFixed(2) : '-';
        row.appendChild(change1h);

        const change24h = document.createElement('td');
        change24h.textContent = crypto.price ? crypto.percent_change_24h.toFixed(2) : '-';
        row.appendChild(change24h);

        const change7d = document.createElement('td');
        change7d.textContent = crypto.price ? crypto.percent_change_7d.toFixed(2) : '-';
        row.appendChild(change7d);
  
        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = crypto.market_cap ? crypto.market_cap.toFixed(2) : '-';
        row.appendChild(marketCapCell);
  
        tableBody.appendChild(row);
      }
    }
  }
  