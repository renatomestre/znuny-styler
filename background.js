(() => {
  const extensionApi = globalThis.browser ?? globalThis.chrome;

  console.log("znuny-styler: background script loaded");

  // let customStyle = `
  //   :root {
  //     --font-size-sm: 10px !important;
  //     --main-font-size: 11px !important;
  //     --padding-xs: 2px !important;
  //     --padding-sm: 2px !important;
  //     --padding-md: 2px !important;
  //   }

  //   .Handle.ui-resizable-handle {
  //     background: white !important;
  //   }
  // `;

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
      // css: customStyle
      func: setVariables
    }).catch((error) => {
      console.error("znuny-styler: could not inject script", error);
    });
  });
})();