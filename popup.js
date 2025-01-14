// Fetch and display logs from the background script
function displayLogs(logs) {
    const logsContainer = document.getElementById("logs");
    logsContainer.innerHTML = ""; // Clear previous logs
  
    if (logs.length === 0) {
      logsContainer.textContent = "No duplicate requests detected.";
      return;
    }
  
    logs.forEach(({ url, method, count, lastTimestamp }) => {
        if(count > 1 ){
            const timestamp = Date.now();
            const logDiv = document.createElement("div");
            logDiv.className = "log";
            logDiv.innerHTML = `>> [${method}] <br> ${url} <br> Duplicates: ${count} | Time since last: ${timestamp - lastTimestamp} ms`;
            logsContainer.appendChild(logDiv);
        }
    });
  }
  
  // Get logs from the background script
  chrome.runtime.sendMessage({ type: "getLogs" }, (response) => {
    if (response && response.logs) {
      displayLogs(response.logs);
    }
  });
  
  // Clear logs
  document.getElementById("clearLogs").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "clearLogs" }, () => {
      displayLogs([]);
    });
  });
  