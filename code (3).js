document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const calloutLog = document.getElementById('callout-log');
    const tickerInput = document.getElementById('ticker-input');
    const lookupTickerBtn = document.getElementById('lookup-ticker-btn');
    const tickerInfo = document.getElementById('ticker-info');
    const flowList = document.getElementById('flow-list');
    const premarketBriefing = document.getElementById('premarket-briefing').querySelector('p');
    const middayUpdate = document.getElementById('midday-update').querySelector('p');
    const eodSummary = document.getElementById('eod-summary').querySelector('p');
    const alertList = document.getElementById('alert-list');
    const addAlertForm = document.getElementById('add-alert-form');
    const alertInput = document.getElementById('alert-input');
    const quoteDisplay = document.getElementById('quote-display');
    const faqButtons = document.querySelectorAll('.faq-btn');
    const faqDisplay = document.getElementById('faq-display');


    // --- SIMULATED DATA ---

    // Simulated Callouts (In reality, this would come from a database/backend)
    const simulatedCallouts = [
        { id: 1, ticker: 'SPY', details: '415c Exp Fri', entry: 1.25, stop: 0.95, target: '1.75+', caller: 'TraderX' },
        { id: 2, ticker: 'AAPL', details: '170p Exp Next Week', entry: 2.10, stop: 1.50, target: '3.00, 4.00', caller: 'AnalystZ' },
        { id: 3, ticker: 'TSLA', details: '165c Exp Today', entry: 0.80, stop: 0.55, target: '1.20+', caller: 'TraderX' },
    ];

    // Simulated Alerts
    let simulatedAlerts = [
        { id: 1, alert: 'SPY > 420' },
        { id: 2, alert: 'TSLA < 155' },
    ];

    // Simulated Quotes
    const quotes = [
        "Discipline over dopamine. Stick to your edge, stay out of the noise.",
        "The stock market is a device for transferring money from the impatient to the patient.",
        "Plan your trade and trade your plan.",
        "Cut losses short, let winners run.",
        "Risk comes from not knowing what you're doing."
    ];

    // Simulated FAQ Content
    const faqData = {
        theta: { title: "What is Theta?", content: "Theta (θ) represents the rate of decline in the value of an option due to the passage of time. It's also known as time decay. Option sellers benefit from theta, while option buyers are negatively impacted." },
        risk: { title: "What is Risk/Reward?", content: "Risk/Reward Ratio compares the potential profit of a trade (reward) to its potential loss (risk). For example, risking $1 to make $3 is a 1:3 risk/reward ratio. Favorable ratios are generally sought after." }
    };

    // --- FUNCTIONS ---

    // Function to display callouts
    function displayCallouts() {
        calloutLog.innerHTML = ''; // Clear loading message
        if (simulatedCallouts.length === 0) {
            calloutLog.innerHTML = '<p>No active callouts.</p>';
            return;
        }
        simulatedCallouts.forEach(callout => {
            const div = document.createElement('div');
            div.classList.add('callout-entry');
            div.innerHTML = `
                <span class="ticker">${callout.ticker} ${callout.details}</span>
                <span class="entry">Entry: ${callout.entry.toFixed(2)}</span>
                <span class="stop">Stop: ${callout.stop.toFixed(2)}</span>
                <span class="target">Target: ${callout.target}</span>
                <span class="caller">By: ${callout.caller}</span>
            `;
            // In a real app, you might add reaction buttons here
            calloutLog.appendChild(div);
        });
    }

    // Function to simulate fetching ticker data
    async function fetchTickerData(ticker) {
        tickerInfo.innerHTML = `<p>Fetching data for ${ticker.toUpperCase()}...</p>`;
        flowList.innerHTML = '<li>Fetching flow...</li>';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 750));

        // *** Replace with ACTUAL API call in a real backend ***
        if (ticker.toUpperCase() === 'AAPL') {
            tickerInfo.innerHTML = `
                <p><strong>${ticker.toUpperCase()}</strong></p>
                <p>Price: <strong>$175.50</strong></p>
                <p>Volume: <strong>55.2M</strong></p>
                <p>IV (30d): <strong>28.5%</strong></p>
            `;
            flowList.innerHTML = `
                <li class="bullish">📈 Sweep: AAPL 180c Exp Fri ($80k Premium)</li>
                <li class="bearish">📉 Block: AAPL 170p Exp Next Month ($210k Premium)</li>
            `;
        } else if (ticker.toUpperCase() === 'SPY') {
             tickerInfo.innerHTML = `
                <p><strong>${ticker.toUpperCase()}</strong></p>
                <p>Price: <strong>$412.80</strong></p>
                <p>Volume: <strong>88.1M</strong></p>
                <p>IV (30d): <strong>15.1%</strong></p>
            `;
             flowList.innerHTML = `
                <li class="bullish">📈 Sweep: SPY 415c Exp Today ($1.2M Premium)</li>
                <li class="bullish">📈 Sweep: SPY 420c Exp Fri ($950k Premium)</li>
                <li class="bearish">📉 Block: SPY 410p Exp Fri ($2.5M Premium)</li>
            `;
        } else {
            tickerInfo.innerHTML = `<p>No data found for ${ticker.toUpperCase()}.</p>`;
            flowList.innerHTML = '<li>No flow data.</li>';
        }
    }

    // Function to load simulated briefings
    function loadBriefings() {
         // Simulate API delay/fetch
        setTimeout(() => {
            premarketBriefing.textContent = "Futures slightly green. Watching $XYZ pre-market gap. Key resistance at SPY 415.";
            middayUpdate.textContent = "SPY consolidating near 412. Tech showing relative strength. Keep an eye on oil prices.";
            eodSummary.textContent = "Market closed mixed. SPY finished -0.2%. Tech led, Energy lagged. VIX remains elevated.";
        }, 500);
    }

     // Function to display alerts
    function displayAlerts() {
        alertList.innerHTML = ''; // Clear loading/previous
        if (simulatedAlerts.length === 0) {
            alertList.innerHTML = '<li>No active alerts.</li>';
            return;
        }
        simulatedAlerts.forEach(alert => {
            const li = document.createElement('li');
            li.textContent = alert.alert;
            // Add a (simulated) remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = '10px';
            removeBtn.style.padding = '2px 5px';
            removeBtn.style.fontSize = '0.8em';
            removeBtn.onclick = () => removeAlert(alert.id);
            li.appendChild(removeBtn);
            alertList.appendChild(li);
        });
    }

    // Function to simulate adding an alert
    function addAlert(alertText) {
        if (!alertText.trim()) return; // Ignore empty input
        const newId = simulatedAlerts.length > 0 ? Math.max(...simulatedAlerts.map(a => a.id)) + 1 : 1;
        simulatedAlerts.push({ id: newId, alert: alertText });
        displayAlerts(); // Refresh the list
        console.log(`Simulated adding alert: ${alertText}`);
    }

     // Function to simulate removing an alert
    function removeAlert(id) {
        simulatedAlerts = simulatedAlerts.filter(alert => alert.id !== id);
        displayAlerts(); // Refresh the list
        console.log(`Simulated removing alert ID: ${id}`);
    }

    // Function to display a random quote
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
    }

    // Function to display FAQ content
    function displayFaq(topic) {
        const data = faqData[topic];
        if (data) {
            faqDisplay.innerHTML = `<strong>${data.title}</strong><p>${data.content}</p>`;
        } else {
            faqDisplay.innerHTML = `<p>Topic not found.</p>`;
        }
    }


    // --- EVENT LISTENERS ---

    // Ticker Lookup Button
    lookupTickerBtn.addEventListener('click', () => {
        const ticker = tickerInput.value.trim();
        if (ticker) {
            fetchTickerData(ticker);
        } else {
            tickerInfo.innerHTML = `<p>Please enter a ticker symbol.</p>`;
             flowList.innerHTML = '<li>No flow data.</li>';
        }
    });

    // Allow pressing Enter in ticker input
     tickerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            lookupTickerBtn.click(); // Trigger button click
        }
    });

    // Add Alert Form Submission (Simulation)
    addAlertForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        addAlert(alertInput.value);
        alertInput.value = ''; // Clear input
    });

    // FAQ Buttons
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic = button.getAttribute('data-topic');
            displayFaq(topic);
        });
    });


    // --- INITIAL LOAD ---
    displayCallouts();
    loadBriefings();
    displayAlerts();
    displayRandomQuote();
    // Optionally display a default FAQ
    // displayFaq('theta');

});