(() => {
  const styleId = "znuny-styler-extension-style";
  const styleText = `
    *, *::before, *::after {
      padding: 2px !important;
    }
  `;

  function installStyle() {
    if (!document.documentElement || document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = styleText;
    (document.head || document.documentElement).appendChild(style);
  }

  installStyle();

  new MutationObserver(installStyle).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
