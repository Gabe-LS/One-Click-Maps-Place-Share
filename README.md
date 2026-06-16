# One-Click Maps Place Share

Chrome extension that replaces the share button on Google Maps. Instead of opening the share dialog, it copies the place name, location, and a short link straight to your clipboard.

Click share on any place and you get this:

```
Kota Bharu Sultan Ismail Petra Airport
Pengkalan Chepa, 16100 Kota Bharu, Kelantan, Malaysia
https://maps.app.goo.gl/1XdC7ozQWLMGD6Zn8
```

Works regardless of what language Google Maps is set to.

## Install

**Chrome Web Store** — *(link coming soon)*

**Manual** — clone this repo, go to `chrome://extensions`, enable Developer mode, click "Load unpacked", select the repo folder.

## How it works

1. An XHR/fetch interceptor (MAIN world, `document_start`) captures the short link from Google Maps' own `CreateShortUrl` RPC response
2. A content script places an invisible overlay on the share button
3. On click: the share dialog opens hidden (CSS `:has()` selectors), the short link is captured, the dialog is closed, and the place name + location + link are copied to clipboard
4. Second click on the same place reuses the cached link instantly

## Debug logging

Click the extension icon in the toolbar and toggle "Debug logging". All logs use the `[OCMPS]` prefix — filter by it in DevTools console. The Maps tab reloads automatically when you toggle.

## Files

| File | Purpose |
|---|---|
| `interceptor.js` | MAIN world: dialog-hiding CSS + XHR/fetch short link interceptor |
| `content.js` | ISOLATED world: overlay, share flow, clipboard, toast |
| `popup.html/js` | Settings popup (debug toggle) |
| `tests/` | Playwright test scripts (brief + 10-language) |

## Privacy

No data is collected, stored, or transmitted. Everything stays in your browser. Full policy in [PRIVACY.md](PRIVACY.md).

## Credits

Icon by [Kerismaker](https://www.flaticon.com/authors/kerismaker) via Flaticon.
