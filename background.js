(() => {
  console.log("znuny-styler: service worker loaded");

  function setVariables() {
    if (!document.documentElement) {
      return;
    }

    document.documentElement.style.setProperty("--font-size-sm", "10px", "important");
    document.documentElement.style.setProperty("--main-font-size", "11px", "important");
    document.documentElement.style.setProperty("--padding-xs", "2px", "important");
    document.documentElement.style.setProperty("--padding-sm", "2px", "important");
    document.documentElement.style.setProperty("--padding-md", "2px", "important");

    document.querySelectorAll(".Handle.ui-resizable-handle").forEach((element) => {
      element.style.setProperty("background", "white", "important");
    });

    console.log("znuny-styler: style was applied");
  }

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete" || tab.url?.startsWith("chrome://")) {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId },
      func: setVariables
    }).catch((error) => {
      console.error("znuny-styler: could not inject script", error);
    });
  });
})();
