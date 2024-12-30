const radarCanvas = document.getElementById("radarCanvas");
const radarCtx = radarCanvas.getContext("2d");
let sweepAngle = 0;

// Function to draw the radar background and rings (with light blue rings)
// Function to draw the radar background and diagonal grid lines
function drawRadarBackground() {
    radarCtx.clearRect(0, 0, radarCanvas.width, radarCanvas.height);

    // Draw the radar circle (background)
    radarCtx.beginPath();
    radarCtx.arc(200, 200, 180, 0, 2 * Math.PI);
    radarCtx.strokeStyle = "#1e2a34"; // Dark blue color
    radarCtx.lineWidth = 2;
    radarCtx.setLineDash([5, 10]); // Dotted rings
    radarCtx.stroke();

    // Draw concentric circles (light blue)
    for (let i = 1; i <= 3; i++) {
        radarCtx.beginPath();
        radarCtx.arc(200, 200, 60 * i, 0, 2 * Math.PI);
        radarCtx.strokeStyle = "#ADD8E6"; // Light blue
        radarCtx.lineWidth = 1;
        radarCtx.setLineDash([5, 15]);
        radarCtx.stroke();
    }

    // Reset dash style
    radarCtx.setLineDash([]);

    // Draw diagonal grid lines
    drawDiagonalGrid();
}

// Function to draw diagonal grid lines inside the circle
function drawDiagonalGrid() {
    const centerX = 200;
    const centerY = 200;
    const radius = 180;

    radarCtx.strokeStyle = "#ADD8E6"; // Light blue for diagonal lines
    radarCtx.lineWidth = 1;

    // Loop to draw diagonal lines
    for (let angle = -45; angle <= 135; angle += 45) {
        const angleRad = (angle * Math.PI) / 180;
        const x1 = centerX + radius * Math.cos(angleRad);
        const y1 = centerY + radius * Math.sin(angleRad);
        const x2 = centerX - radius * Math.cos(angleRad);
        const y2 = centerY - radius * Math.sin(angleRad);

        radarCtx.beginPath();
        radarCtx.moveTo(x1, y1);
        radarCtx.lineTo(x2, y2);
        radarCtx.stroke();
    }
}


// Function to draw the radar sweep line in red
function drawRadarSweep() {
    const angleRad = (sweepAngle * Math.PI) / 180;
    const x = 200 + 180 * Math.cos(angleRad);
    const y = 200 + 180 * Math.sin(angleRad);

    radarCtx.beginPath();
    radarCtx.moveTo(200, 200);
    radarCtx.lineTo(x, y);
    radarCtx.strokeStyle = "#FF0000";  /* Red sweep line */
    radarCtx.lineWidth = 2;
    radarCtx.stroke();

    // Rotate the sweep angle
    sweepAngle = (sweepAngle + 2) % 360;
}

// Function to simulate detected pings on the radar (red pings)
// Function to simulate detected pings on the radar (red pings)
function drawRadarPings() {

}


// Main function to draw the radar animation continuously
function drawRadar() {
    drawRadarBackground();  // Draw the background rings (light blue)
    drawRadarSweep();       // Draw the sweeping line (red)

    requestAnimationFrame(drawRadar);  // Keep animating
}

drawRadar();
