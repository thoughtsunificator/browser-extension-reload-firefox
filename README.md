# browser-extension-reload-firefox

Firefox userchrome scripts for live-reloading your extensions.

## Prerequisites

- [browser-extension-reload-server](https://github.com/thoughtsunificator/browser-extension-reload-server)
- [BrowserExtensionReload.py](https://gist.github.com/thoughtsunificator/64f5574a601cbdf4722aa32d2e1b2aff)

## How it works

The [firefox/](https://github.com/thoughtsunificator/browser-extension-reload-firefox/tree/master/firefox) folder uses [autoconfig](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig) to load [chrome/userChrome.js](https://github.com/thoughtsunificator/browser-extension-reload-firefox/tree/master/chrome/userChrome.js) which in turn loads the ``chrome/live-reload-extension.js`` scripts.

[chrome/live-reload-extension.js](https://github.com/thoughtsunificator/browser-extension-reload-firefox/blob/master/chrome/live-reload-extension.js) installs your extensions as a temporary add-ons the same way as ``about:debbuging`` do except that the extension is permanent as it is installed everytime Firefox is launched.

## Usage

1. [Download](https://github.com/thoughtsunificator/browser-extension-reload-firefox/archive/master.zip) this repository archive file and extract it.
2. Place the content of the ``chrome/`` folder in the chrome folder of your Firefox profile folder. eg for Windows: ``%APPDATA%\Mozilla\Firefox\Profiles\{YOUR-PROFILE-HERE}\chrome``
3. Place the content of the ``firefox/`` folder in the installation folder of Firefox. eg for Windows: ``C:\Program Files\Mozilla Developer Preview`` or ``C:\Program Files\Mozilla``
4. Edit the [ADDONS](https://github.com/thoughtsunificator/browser-extension-reload-firefox/blob/0d7658d78b5d32e613ac85a183492990d9789d76/chrome/live-reload-extension.js#L8) constant in ``chrome/live-reload-extension.js``:
