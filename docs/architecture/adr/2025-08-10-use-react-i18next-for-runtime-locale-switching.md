---
title: Use react-i18next for Runtime Locale Switching
status: Accepted
updated: 2025-08-10
---

## Context

Our browser extension requires runtime language switching capability to allow users to change the interface language without modifying browser settings. Initial implementation attempted to use `@wxt-dev/i18n` with custom runtime switching logic, resulting in:

- Complex workarounds with runtime fetching of messages.json files
- Message passing complexity between background and content scripts
- Poor user experience requiring page reloads
- Violation of browser extension architecture patterns

Research revealed that the browser.i18n API (which `@wxt-dev/i18n` wraps) fundamentally does not support runtime locale changes by design. The language is determined solely by the browser or system language settings.

## Decision

We will use `react-i18next` for internationalization in our browser extension, accepting the trade-offs of losing manifest.json localization capabilities and increased bundle size (~40KB).

Implementation approach:

- Remove all custom i18n wrapper code (lib/i18n.ts)
- Remove @wxt-dev/i18n module from the project
- Implement react-i18next with JSON translation files
- Store user language preference in browser.storage.sync
- Provide language switcher in options page

## Consequences

**Positive:**

- Full runtime language switching capability
- Mature, well-documented solution with extensive community support
- Rich feature set including pluralization, interpolation, and formatting
- Consistent developer experience with standard React patterns
- Type-safe with TypeScript support
- No complex workarounds or message passing required

**Negative:**

- Cannot localize manifest.json (extension name/description will be in default language)
- Larger bundle size (~40KB gzipped)
- Translations bundled in JavaScript rather than using browser's native localization
- Slight performance overhead compared to native browser.i18n
- Loss of Chrome Web Store's automatic language detection for extension metadata

## Alternatives

1. **@wxt-dev/i18n (Native Browser i18n)** - Rejected because it cannot support runtime locale switching, which is a critical requirement

2. **Custom Hybrid Solution (Current Implementation)** - Rejected due to:
   - Excessive complexity with runtime fetching
   - Performance issues
   - Maintenance burden
   - Goes against browser extension architecture

3. **Other i18n libraries (vue-i18n, lingui)** - Rejected as they don't offer significant advantages over react-i18next for our React-based extension

## References

- Related RFC: @docs/architecture/rfc/2025-08-10-browser-extension-i18n-strategy.md
- react-i18next Documentation: https://react.i18next.com/
- Chrome Extension i18n Limitations: https://developer.chrome.com/docs/extensions/reference/i18n/
- WXT i18n Module Discussion: https://github.com/wxt-dev/wxt/discussions/930
