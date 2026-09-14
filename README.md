# znuny-styler

A Manifest V3 Chrome extension that sets `padding: 2px !important` on every page element and pseudo-element.

> Set you Znuny URL on manifest.json

## Install locally

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project folder.

Reload an open page after installing the extension. Disable or remove the extension from the same page to restore normal padding.

The extension affects the page DOM. It cannot style content inside cross-origin frames or closed shadow roots.

Made with 💚 and 🤖 by Renato Mestre