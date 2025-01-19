let activeTabId = null; // Store the current active tab ID
const requestMap = new Map(); // Store API requests for the active tab

// Update the activeTabId when the tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
});


// Track API requests for the active tab
function trackRequest(details) {
  if (details.tabId === activeTabId) {
    const { url, method } = details;
    const key = `${method}:${url}`;
    const timestamp = Date.now();

    if (requestMap.has(key)) {
      const { count, lastTimestamp } = requestMap.get(key);
      console.log(
        `Duplicate request detected:\n` +
        `URL: ${url}\n` +
        `Method: ${method}\n` +
        `Count: ${count + 1}\n` +
        `Time since last: ${timestamp - lastTimestamp} ms`
      );
      requestMap.set(key, { count: count + 1, lastTimestamp: timestamp, url: url, method: method });
    } else {
      requestMap.set(key, { count: 1, lastTimestamp: timestamp, url: url, method: method });
    }
  }
}

// Clear the request map when switching tabs
/* chrome.tabs.onActivated.addListener(() => {
  requestMap.clear();
  console.log("Request map cleared for the new active tab.");
}); */

// Handle messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getLogs") {
    const logs = Array.from(requestMap.entries()).map(([key, { count, url, method, lastTimestamp }]) => {
      return { method, url, count, lastTimestamp };
    });
    sendResponse({ logs });
  } else if (message.type === "clearLogs") {
    requestMap.clear();
    sendResponse();
  }
});

// Listen to API requests
chrome.webRequest.onBeforeRequest.addListener(
  trackRequest,
  { urls: ["<all_urls>"] }
);

// https://github.com/kariamyasser/Duplicate-Requests-Chrome-Extension

