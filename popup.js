// disable extension

// Path: popup.js
const button = document.getElementById("toggle");
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
chrome.management.getSelf(function(info) {
  const isEnabled = info.enabled;
  button.textContent = isEnabled ? "Disable Extension" : "Enable Extension";
  button.addEventListener("click", function() {
// disable for this tab

    chrome.management.setEnabled(info.id, !isEnabled, function() {
  
        window.location.reload();
    });
  });
});

});