// Sample data for tokens
const tokens = [
    { name: 'Bitcoin', balance: 2, value: 50000 },
    { name: 'Ethereum', balance: 5, value: 3000 },
    { name: 'Ripple', balance: 1000, value: 1 },
];

const portfolioBody = document.getElementById('portfolio-body');
let portfolioChart;

// Initialize the portfolio table and chart
function initializeDashboard() {
    tokens.forEach((token, index) => addTokenRow(token, index));
    updateChart();
}

// Add a row for each token in the table
function addTokenRow(token, index) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${token.name}</td>
        <td id="balance-${index}">${token.balance}</td>
        <td id="value-${index}">${token.balance * token.value}</td>
        <td>
            <button class="buy-button" onclick="buyToken(${index})">Buy</button>
            <button class="sell-button" onclick="sellToken(${index})">Sell</button>
        </td>
    `;

    portfolioBody.appendChild(row);
}

// Buy a token: Increment balance and update the table and chart
function buyToken(index) {
    tokens[index].balance += 1;
    updateDashboard(index);
}

// Sell a token: Decrement balance and update the table and chart
function sellToken(index) {
    if (tokens[index].balance > 0) {
        tokens[index].balance -= 1;
        updateDashboard(index);
    }
}

// Update the table and chart after a transaction
function updateDashboard(index) {
    document.getElementById(`balance-${index}`).innerText = tokens[index].balance;
    document.getElementById(`value-${index}`).innerText = (tokens[index].balance * tokens[index].value).toFixed(2);
    updateChart();
}

// Update the pie chart to reflect the new portfolio distribution
function updateChart() {
    const labels = tokens.map(token => token.name);
    const data = tokens.map(token => token.balance * token.value);

    if (portfolioChart) portfolioChart.destroy();

    const ctx = document.getElementById('portfolio-chart').getContext('2d');
    portfolioChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Distribution',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        }
    });
}

// Initialize the dashboard when the page loads
window.onload = initializeDashboard;
