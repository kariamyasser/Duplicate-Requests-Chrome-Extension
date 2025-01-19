# API Duplicate Detector Chrome Extension

A Chrome extension to detect and log duplicate API requests for the active tab. It tracks API requests in real-time and provides insights into repeated calls to help optimize your application's performance.

---

## Features
- Monitors network API requests for the active tab.
- Logs duplicate requests with details such as URL, method, and count.
- Provides a user-friendly UI for reviewing duplicate requests.
- Allows users to clear logs and reset tracking.

---

## Installation

### Step 1: Clone the Repository
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/kariamyasser/Duplicate-Requests-Chrome-Extension.git
2. Navigate to the project folder:
   ```bash
   cd Duplicate-Requests-Chrome-Extension

### Step 2: Replace the URL Filter
By default, the extension monitors all URLs. 
You can customize this "<all_urls>" in manifest.js and background.js and replace it with your API URLs

### Step 3: Load the Extension in Chrome
1. Open Chrome and go to chrome://extensions/.
2. Enable Developer Mode using the toggle in the top-right corner.
3. Click Load unpacked and select the folder where you cloned the repository.
4. The extension will now appear in your browser toolbar.
5. Pin the plugin to toolbar for easy access.

## 🛠️ How to Use
1. Open a webpage or web application you want to monitor.
2. Click the API Duplicate Detector extension icon in the browser toolbar.
3. Use the popup window to:
    - View duplicate API request logs.
    - Clear logs using the Clear Logs button.
4. Logs include:
    - URL: The endpoint of the duplicate request.
    - Method: The HTTP method (e.g., GET, POST).
    - Count: The number of duplicate requests detected.

## 🛠️ Development
### Prerequisites
- Chrome: To load and test the extension.
- Node.js (optional): For advanced customization.
### Key Files
- manifest.json: Extension configuration.
- background.js: Core logic for API monitoring.
- popup.html: Popup UI layout.
- popup.js: Logic for rendering logs in the popup.

Feel free to fork this repository and customize it as needed.

## 🤝 Contributing
Contributions are welcome! If you have ideas for improvements or bugs to report:
  1. Open an issue in this repository.
  2. Submit a pull request with your changes.

## 📜 License
This project is licensed under the MIT License.

## 📧 Support
For any questions or issues, contact karim.yasser.ahmed@gmail.com.

