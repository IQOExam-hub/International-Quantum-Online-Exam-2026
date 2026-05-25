/* ===========================
   QUANTUM EXAM - INTERACTIVE SIMULATIONS
   Pure JavaScript with Canvas API
   =========================== */

// ===========================
// SUPERPOSITION VISUALIZER
// ===========================

let superpositionPlaying = true;
let superpositionTime = 0;

function initSuperposition() {
    const canvas = document.getElementById('superpositionCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function draw() {
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#0a0f1a';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }

        // Wave 1 (Cyan)
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
            const y = height / 2 - Math.sin((x + superpositionTime) * 0.02) * 40;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Wave 2 (Blue)
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
            const y = height / 2 - Math.sin((x + superpositionTime) * 0.015 + Math.PI / 2) * 40;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Superposed wave (combined)
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
            const y1 = Math.sin((x + superpositionTime) * 0.02) * 40;
            const y2 = Math.sin((x + superpositionTime) * 0.015 + Math.PI / 2) * 40;
            const y = height / 2 - (y1 + y2);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (superpositionPlaying) {
            superpositionTime += 1;
        }
        requestAnimationFrame(draw);
    }

    draw();
}

function toggleSuperposition() {
    superpositionPlaying = !superpositionPlaying;
}

function resetSuperposition() {
    superpositionTime = 0;
    superpositionPlaying = true;
}

// ===========================
// ELECTRON ORBITS
// ===========================

let electronsPlaying = true;
let electronsTime = 0;

function initElectrons() {
    const canvas = document.getElementById('electronCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear canvas
        ctx.fillStyle = '#0a0f1a';
        ctx.fillRect(0, 0, width, height);

        // Draw nucleus
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw orbits
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.lineWidth = 1;
        for (let r = 60; r <= 140; r += 40) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw electrons
        const electrons = [
            { radius: 60, speed: 0.02, color: '#06b6d4' },
            { radius: 100, speed: 0.015, color: '#0284c7' },
            { radius: 140, speed: 0.01, color: '#2563eb' },
        ];

        electrons.forEach((e) => {
            const angle = (electronsTime * e.speed) % (Math.PI * 2);
            const x = centerX + Math.cos(angle) * e.radius;
            const y = centerY + Math.sin(angle) * e.radius;

            ctx.fillStyle = e.color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.strokeStyle = e.color + '40';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.stroke();
        });

        if (electronsPlaying) {
            electronsTime += 1;
        }
        requestAnimationFrame(draw);
    }

    draw();
}

function toggleElectrons() {
    electronsPlaying = !electronsPlaying;
}

function resetElectrons() {
    electronsTime = 0;
    electronsPlaying = true;
}

// ===========================
// DOUBLE SLIT EXPERIMENT
// ===========================

let slitPlaying = true;
let slitTime = 0;

function initSlit() {
    const canvas = document.getElementById('slitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function draw() {
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#0a0f1a';
        ctx.fillRect(0, 0, width, height);

        // Draw slits
        ctx.fillStyle = '#334155';
        ctx.fillRect(width / 3 - 2, height / 2 - 60, 4, 50);
        ctx.fillRect(width / 3 - 2, height / 2 + 10, 4, 50);

        // Draw interference pattern
        for (let y = 0; y < height; y += 2) {
            const distance1 = Math.sqrt(Math.pow(width / 3, 2) + Math.pow(y - height / 2 + 35, 2));
            const distance2 = Math.sqrt(Math.pow(width / 3, 2) + Math.pow(y - height / 2 - 35, 2));
            const pathDiff = distance1 - distance2;
            const phase = (pathDiff * 0.02 + slitTime * 0.01) % (Math.PI * 2);
            const intensity = Math.abs(Math.sin(phase)) * 200;

            ctx.fillStyle = `rgba(6, 182, 212, ${intensity / 255})`;
            ctx.fillRect(width / 2, y, width / 2, 2);
        }

        // Draw wave fronts from slits
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        const radius = (slitTime * 2) % 200;
        ctx.beginPath();
        ctx.arc(width / 3, height / 2 - 35, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width / 3, height / 2 + 35, radius, 0, Math.PI * 2);
        ctx.stroke();

        if (slitPlaying) {
            slitTime += 1;
        }
        requestAnimationFrame(draw);
    }

    draw();
}

function toggleSlit() {
    slitPlaying = !slitPlaying;
}

function resetSlit() {
    slitTime = 0;
    slitPlaying = true;
}

// ===========================
// QUANTUM TUNNELING
// ===========================

let tunnelingPlaying = true;
let tunnelingTime = 0;
let tunnelingParticles = [];

function initTunneling() {
    const canvas = document.getElementById('tunnelingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Initialize particles
    for (let i = 0; i < 50; i++) {
        tunnelingParticles.push({
            x: Math.random() * 150 + 50,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 + 1,
            vy: (Math.random() - 0.5) * 2,
        });
    }

    function draw() {
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#0a0f1a';
        ctx.fillRect(0, 0, width, height);

        // Draw barrier
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.fillRect(width / 2 - 20, 0, 40, height);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(width / 2 - 20, 0, 40, height);

        // Update and draw particles
        tunnelingParticles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off top/bottom
            if (p.y < 0 || p.y > height) {
                p.vy *= -1;
                p.y = Math.max(0, Math.min(height, p.y));
            }

            // Tunneling probability
            if (p.x > width / 2 - 20 && p.x < width / 2 + 20) {
                if (Math.random() < 0.15) {
                    p.vx *= -1;
                } else if (Math.random() < 0.3) {
                    p.x += p.vx * 2;
                }
            }

            // Reset if off screen
            if (p.x > width) {
                p.x = 0;
                p.y = Math.random() * height;
            }

            // Draw particle
            const color = p.x > width / 2 ? '#10b981' : '#06b6d4';
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        if (tunnelingPlaying) {
            tunnelingTime += 1;
        }
        requestAnimationFrame(draw);
    }

    draw();
}

function toggleTunneling() {
    tunnelingPlaying = !tunnelingPlaying;
}

function resetTunneling() {
    tunnelingTime = 0;
    tunnelingPlaying = true;
}

// ===========================
// TAB FUNCTIONALITY
// ===========================

function showTab(tabName) {
    // Hide all tabs
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) {
        selectedPane.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// ===========================
// PDF HEIGHT ADJUSTMENT
// ===========================

function setPdfHeight(height) {
    const pdfViewer = document.querySelector('.pdf-viewer');
    if (pdfViewer) {
        pdfViewer.style.height = height + 'px';
    }
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initSuperposition();
    initElectrons();
    initSlit();
    initTunneling();
});
