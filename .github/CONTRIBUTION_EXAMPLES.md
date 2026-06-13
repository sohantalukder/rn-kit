# GitHub Contribution Examples

Use these examples when creating issues, pull requests, branches, commits, and release notes for this repository.

## Branch Names

```text
fix/button-loading-state
feat/avatar-fallback-color
docs/theme-provider-example
test/dialog-manager-queue
chore/update-peer-deps
```

## Commit Messages

```text
fix: prevent button press while loading
feat: add avatar fallback color prop
docs: add theme provider setup example
test: cover dialog manager queue behavior
chore: update package metadata
```

## Bug Issue

```md
Title: fix: button still triggers onPress while loading

## Description

Button calls onPress even when loading is true.

## Steps to Reproduce

1. Render Button with loading=true and onPress handler.
2. Tap the button.
3. Check whether the handler was called.

## Expected Behavior

The button should ignore presses while loading.

## Actual Behavior

The onPress handler is called.

## Environment

- Package version: 0.1.1
- React Native version: 0.80.x
- Platform: Android
- Node version: 22.x
```

## Feature Issue

````md
Title: feat: add Avatar fallback color

## Problem

Avatar initials need a stable background color when there is no image.

## Proposal

Add a fallbackColor prop to Avatar and use it when source is empty.

## Example Usage

```tsx
<Avatar label="ST" fallbackColor="#0ea5e9" />
```
````

## Pull Request

```md
## Summary

- Added fallbackColor support to Avatar.
- Updated the Avatar docs preview and metadata.
- Added tests for image and initials fallback rendering.

## Type of Change

- [ ] Fix
- [x] Feature
- [x] Documentation
- [x] Test

## Validation

- [x] `npm run typecheck`
- [x] `npm test`
- [x] `npm run docs:build`

## Screenshots or Preview

Add before/after screenshots for UI or docs changes.

## Checklist

- [x] I updated docs or examples when behavior changed.
- [x] I updated tests or explained why tests are not needed.
- [x] I bumped the package version when opening a PR into `main`.
- [x] I checked that this PR does not include unrelated changes.
```

## Release Note

```md
## 0.1.2

- Added Avatar fallback color support.
- Fixed Button loading press handling.
- Improved ThemeProvider setup examples.
```
