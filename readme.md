# <div align="center">🚀 Tap2PC</div>

<div align="center">
  <img src="https://img.shields.io/badge/Tap2PC-Remote_Control-blue?style=for-the-badge&logo=node.js" alt="Banner" />
  <br />
  <p><strong>Control your PC from your phone — No cloud, no lag, just a simple tap.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square&logo=node.js" alt="Node Version" />
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
    <img src="https://img.shields.io/badge/License-ISC-orange?style=flat-square" alt="License" />
  </p>
</div>

---

## 📖 Overview
**Tap2PC** is a production-grade, **local-first remote control system** that bridges the gap between your phone and your computer. It turns your smartphone into a powerful dashboard to manage your system's power, hardware performance, and files—all over your local network (LAN). No cloud, no logins, and zero external dependencies.

---

## 🔥 Key Features

### 🎮 **System Command Center**
| Action | Description |
| :--- | :--- |
| 🛑 **Shutdown** | Gracefully power down your PC remotely. |
| 🔄 **Restart** | Reboot your system instantly with one tap. |
| 🔒 **Lock** | Secure your workstation instantly when walking away. |

### 📈 **Live Telemetry & Monitoring**
*   **CPU & RAM:** Track hardware usage percentages in real-time.
*   **Network Activity:** Monitor active upload and download speeds.
*   **Uptime Tracking:** Know exactly how long your machine has been active.

### 📂 **Wireless File Bridge**
*   **Upload:** Send files or photos from your phone directly to your PC.
*   **Download:** Access and download files from your PC back to your mobile device.
*   **Local Storage:** View a dedicated list of all uploaded files.

---

## 🛠️ Tech Stack
Tap2PC is built with modern, high-performance tools:
*   **Runtime/Backend:** Node.js & Express.js
*   **Language:** TypeScript for type-safe execution.
*   **Hardware API:** Systeminformation for hardware hooks.
*   **File Handling:** Multer for managing uploads.
*   **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript with a responsive, mobile-optimized UI.

---

## 🏗️ Project Architecture
```text
Tap2PC/
│
├── backend/
│ ├── src/
│ │ ├── server.ts
│ │ ├── routes/
│ │ ├── services/
│ │ ├── utils/
│ │
│
├── frontend/
│ ├── pages/
│ │ ├── index.html
│ │ ├── status.html
│ │ ├── feedback.html
│ │
│ ├── css/
│ │ ├── style.css
│ │ ├── status.css
│ │
│ ├── javascript/
│ │ ├── app.js
│ │ ├── status.js
│ │ ├── files.js
│ │
│
├── uploads/
├── package.json
├── tsconfig.json
└── README.md

```

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/tanjimulsabbir/tap2pc.git
cd tap2pc
```

## 2. Install dependencies
```
npm install
```

## 3. Run development server
```
npm run dev
```

### 4. Find your PC IP address
To connect your mobile device, you first need to identify your computer's local IP address.

#### **Linux / Mac**
```bash
ip a
```
WindowsBashipconfig
Example output: http://192.168.68.107:30005. Open on MobileWiFi Sync: Connect your phone & PC to the same WiFi network.Browser: Open any web browser on your phone.Connect: Enter the URL shown in your terminal.📡 API Endpoints🖥️ System ControlActionMethodEndpointDescriptionShutdownGET/shutdownPower off the PC immediatelyRestartGET/restartReboot the systemLockGET/lockLock the user session📊 System InformationActionMethodEndpointReturnsSystem StatusGET/statusCPU, RAM, Network, Uptime, & OS info📁 File SystemActionMethodEndpointUploadPOST/uploadList FilesGET/filesDownloadGET/download/:filename🖥️ UI Features🏠 Dashboard Home Page: Clean and intuitive interface.🔳 Action Buttons Grid: Quick-tap controls for system actions.📈 System Monitoring Overlay: Real-time data visualization.📂 File Transfer Section: Easy upload/download management.💾 Storage Usage Bar: Visual indicator of disk space.🔔 Feedback Modals: Instant status updates after every action.🔐 Security Notice[!CAUTION]IMPORTANT: Tap2PC executes system-level commands directly on your machine.Recommended usage:✅ Only use on trusted devices.✅ Only use on your Local Area Network (LAN).❌ Do NOT expose to the public internet without authentication.🎯 Use Cases🏠 Personal PC Remote: Control your media PC from the couch.💼 Workstation Management: Manage office PCs remotely.📶 Wireless File Transfer: Move files without cables.📊 Monitoring: Keep an eye on system resources.⚡ Quick Actions: Shutdown or restart without touching the hardware.💻 Developer Productivity: A tool for enhancing dev workflows.🧭 Future Improvements[ ] 🔐 Authentication System: Token-based or login security.[ ] 📡 WebSockets: Real-time bi-directional updates.[ ] 📱 Mobile Apps: Native versions for React Native / Flutter.[ ] 🖥 Desktop App: Electron-based installer for easy setup.[ ] 🤳 QR Connection: Scan a code to connect instantly.[ ] ☁️ Cloud Relay: Optional mode for remote access outside LAN.[ ] 📊 Live Graphs: Real-time monitoring for system stats.👨‍💻 AuthorBuilt with ❤️ by Tanjimul Islam Sabbir📜 LicenseISC License — Free for personal and educational use.🚀 Final NoteTap2PC is designed to feel like a real SaaS product while running completely locally. It gives you instant control of your computer from your phone — fast, simple, and powerful.