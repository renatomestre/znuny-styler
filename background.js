(() => {
  const extensionApi = globalThis.browser ?? globalThis.chrome;

  console.log("znuny-styler: background script loaded");

  function run() {
    if (!document.documentElement) {
      return;
    }

    const navigation = document.getElementById("Navigation");
    const toolbar = document.getElementById("ToolBar");
    const toolbarRow = document.querySelector(".toolbar-row");
    const toolbarToggle = document.getElementById("ToolBar-toggle");

    toolbarRow?.style.setProperty("border", "none", "important");
    toolbarToggle?.style.setProperty("display", "none", "important");

    if (navigation && toolbar) {
      toolbar.style.setProperty("float", "left", "important");
      toolbar.style.setProperty("margin-top", "0px", "important");
      toolbar.querySelectorAll(":scope li").forEach((element) => {
        element.style.setProperty("float", "inline-end", "important");
      });

      navigation.appendChild(toolbar);
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

  function isScriptableTabUrl(url) {
    if (!url) {
      return false;
    }

    try {
      const parsedUrl = new URL(url);

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return false;
      }

      return url.indexOf("znuny") !== -1 || url.indexOf("otrs") !== -1;
    } catch {
      return false;
    }
  }

  extensionApi.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete" || !isScriptableTabUrl(tab.url)) {
      return;
    }

    extensionApi.scripting.executeScript({
      target: { tabId },
      func: run
    }).catch((error) => {
      console.error("znuny-styler: could not inject script", error);
    });
  });
})();