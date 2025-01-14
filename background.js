const requestMap = new Map();

// Function to handle API requests
function trackRequest(details) {
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
