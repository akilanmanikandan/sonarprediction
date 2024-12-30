document.getElementById("activate-sonar").addEventListener("click", async function () {
    // Retrieve the input values
    const sonarValuesInput = document.getElementById("sonar-values");
    const features = sonarValuesInput.value.trim().split(',').map(val => parseFloat(val));

    // Validate input: Ensure there are exactly 60 numeric values
    if (features.length !== 60 || features.some(isNaN)) {
        document.getElementById("result").innerText = "Please enter exactly 60 numeric values, separated by commas.";
        return;
    }

    // Show scanning status to the user
    document.getElementById("result").innerText = "Scanning...";

    setTimeout(async () => {
        try {
            // Make an API request to the '/predict' endpoint
            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ features }),
            });

            const result = await response.json(); // Parse JSON response
            if (response.ok) {
                document.getElementById("result").innerText = result.result;

                // Update the chart with real intensity values (optional placeholder logic)
                const intensity = Math.random() * 100; // Example dynamic value for demonstration
                updateChart(intensity);
            } else {
                // Handle errors returned by the server
                document.getElementById("result").innerText = `Error: ${result.error || 'Unknown error'}`;
            }
        } catch (error) {
            // Handle network or unexpected errors
            document.getElementById("result").innerText = `Error: ${error.message}`;
        }
    }, 3000); // 3-second delay simulating scanning
});

// Initialize the Chart.js graph
const ctx = document.getElementById("dataChart").getContext("2d");
const sonarChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], // Time or sequence
        datasets: [
            {
                label: "Sonar Detection Intensity",
                data: [],
                borderColor: "#0f0",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                tension: 0.3,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Time/Scan" } },
            y: { title: { display: true, text: "Intensity" }, min: 0, max: 100 },
        },
    },
});

// Function to dynamically update the chart with new data points
function updateChart(value) {
    const currentTime = new Date().toLocaleTimeString(); // Get current time as label
    sonarChart.data.labels.push(currentTime);
    sonarChart.data.datasets[0].data.push(value);

    // Limit the number of data points shown (e.g., max 10)
    if (sonarChart.data.labels.length > 10) {
        sonarChart.data.labels.shift();
        sonarChart.data.datasets[0].data.shift();
    }

    sonarChart.update();
}
