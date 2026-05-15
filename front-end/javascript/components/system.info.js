export async function ShowSystemInfo(config) {
    // --- 1. Clean Up & Build Slide-in Overlay Panel ---
    const existingOverlay = document.getElementById('sysInfoOverlay');
    if (existingOverlay) existingOverlay.remove();

    const overlayPage = document.createElement('div');
    overlayPage.className = 'overlay-page';
    overlayPage.id = 'sysInfoOverlay';

    // Inject Modern Windows/iOS Inspired Spinning Canvas Structure
    overlayPage.innerHTML = `
        <div class="sys-loading-wrapper">
            <div class="spinner-container">
                <div class="spinner-core"></div>
                <div class="spinner-ring"></div>
            </div>
            <p class="sys-loading-text">Retrieving System Metrics...</p>
        </div>
    `;
    document.body.appendChild(overlayPage);

    // Trigger immediate reflow to process CSS transition slide-in smoothly
    requestAnimationFrame(() => {
        overlayPage.classList.add('active');
    });

    try {
        // --- 2. Live REST Data Handshake ---
        const response = await fetch(`/${config.action}`);
        if (!response.ok) throw new Error("PC metric endpoint unreachable");

        const data = await response.json();

        // --- 3. Compute Structural Storage Configurations ---
        const ramTotal = (data.mem.total / 1024 / 1024 / 1024).toFixed(2);
        const ramUsed = (data.mem.used / 1024 / 1024 / 1024).toFixed(2);
        const ramPercentage = Math.round((data.mem.used / data.mem.total) * 100);
        const batteryHealth = Math.round((data.battery.maxCapacity / data.battery.designedCapacity) * 100);

        // --- 4. Transition Template: Swap loading for Dashboard Layout ---
        overlayPage.innerHTML = `
            <div class="overlay-header">
                <button class="nav-action-btn back-btn" id="backSysOverlay" title="Back to previous screen">
              <i class="fas fa-chevron-left"></i> <span style="margin-left: 5px;">Back</span>
                </button>
                <h2 class="overlay-title">System Monitor</h2>
                <button class="nav-action-btn close-btn" id="closeSysOverlay" title="Exit Overlay">&times;</button>
            </div>
            
            <div class="sys-info-grid">
                
                <!-- OS Info Card -->
                <div class="stat-detail-card">
                    <div class="stat-icon os-brand">💻</div>
                    <div class="stat-info">
                        <label>Operating System</label>
                        <div class="stat-row">
                            <span class="value">${data.os.distro}</span>
                            <span class="percent">${data.os.release}</span>
                        </div>
                        <div class="stat-row bottom-metadata">
                            <span>Kernel: ${data.os.kernel}</span>
                            <span>${data.os.hostname.replace(/-/g, ' ')}</span>
                        </div>
                    </div>
                </div>

                <!-- Processor Card (CPU) -->
                <div class="stat-detail-card">
                    <div class="stat-icon cpu">⚙️</div>
                    <div class="stat-info">
                        <label>Processor (CPU)</label>
                        <div class="stat-row">
                            <span class="value">${data.cpu.speed} GHz</span>
                            <span class="percent">${data.cpu.cores} Cores</span>
                        </div>
                        <div class="stat-row bottom-metadata">
                            <span>${data.cpu.manufacturer} ${data.cpu.brand}</span>
                        </div>
                    </div>
                </div>

                <!-- Memory Card (RAM) -->
                <div class="stat-detail-card">
                    <div class="stat-icon ram">📊</div>
                    <div class="stat-info">
                        <label>Memory (RAM)</label>
                        <div class="stat-row">
                            <span class="value">${ramUsed} GB <small>/ ${ramTotal} GB</small></span>
                            <span class="percent">${ramPercentage}%</span>
                        </div>
                        <div class="mini-progress">
                            <div class="bar" style="width: ${ramPercentage}%; background: var(--accent-purple, #a855f7);"></div>
                        </div>
                    </div>
                </div>

                <!-- Power Metrics Card -->
                <div class="stat-detail-card">
                    <div class="stat-icon battery">🔋</div>
                    <div class="stat-info">
                        <label>Power & Battery Health</label>
                        <div class="stat-row">
                            <span class="value">${data.battery.percent}%</span>
                            <span class="temp">${data.battery.acConnected ? '🔌 AC Connected' : 'Discharging'}</span>
                        </div>
                        <div class="mini-progress">
                            <div class="bar" style="width: ${batteryHealth}%; background: var(--accent-green, #22c55e);"></div>
                        </div>
                        <div class="stat-row bottom-metadata" style="margin-top: 8px;">
                            <span>Health Capacity: ${batteryHealth}%</span>
                            <span>Cycles: ${data.battery.cycleCount}</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Network Footer Area -->
            <div class="network-stats">
                <div class="net-item">
                    <span>⚡ Status: <strong>Online</strong></span>
                </div>
                <div class="net-item">
                    <span>📡 Interface Rate: <strong>Full Duplex</strong></span>
                </div>
            </div>
        `;

        // --- 5. Clean Exit & Dismissal Animations ---
        const exitOverlay = () => {
            overlayPage.classList.remove('active');
            // Wait for CSS slide transition (.4s) to finish before removing DOM node
            setTimeout(() => overlayPage.remove(), 400);
        };

        document.getElementById('backSysOverlay').addEventListener('click', exitOverlay);
        document.getElementById('closeSysOverlay').addEventListener('click', exitOverlay);

    } catch (error) {
        console.error("Dashboard error:", error);
        overlayPage.classList.remove('active');
        setTimeout(() => overlayPage.remove(), 400);
        alert(`⚠️ Failed to load parameters: ${error.message}`);
    }
}