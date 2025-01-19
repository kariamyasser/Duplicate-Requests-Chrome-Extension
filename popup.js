let duplicateRequests = [];
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
            logDiv.innerHTML = `>> [${method}] ${url} <br> Duplicates: ${count} | Time since last: ${timestamp - lastTimestamp} ms`;
            logsContainer.appendChild(logDiv);
        }
    });
  }
  
  // Get logs from the background script
  chrome.runtime.sendMessage({ type: "getLogs" }, (response) => {
    if (response && response.logs) {
      duplicateRequests = response.logs;
      displayLogs(response.logs);
    }
  });
  
  // Clear logs
  document.getElementById("clearLogs").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "clearLogs" }, () => {
      displayLogs([]);
    });
  });

  document.getElementById('exportButton').addEventListener('click', () => {
    const data = duplicateRequests.map(({ url, method, count, lastTimestamp }) => ({
      method: method,
      url: url,
      count: count,
      timeSinceLast: Date.now() - lastTimestamp
    })).filter(e => e.count > 1);
  
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'duplicate_requests.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  