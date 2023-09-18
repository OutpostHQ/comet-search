# Search.js

Search.js is a fast, composable React and Web components.

**Table of Contents**

- [Search.js for React](#install-react-component)
- [Search.js for Web Components](#insrall-web-component)

## Install React Component

```sh
# with npm
npm install @searchjs/react

# with yarn
yarn add @searchjs/react

# with pnpm
pnpm add @searchjs/react
```

## Install Web Component

```sh
# with npm
npm install @searchjs/web

# with yarn
yarn add @searchjs/web

# with pnpm
pnpm add @searchjs/web
```

### Anatomy

```tsx
<SearchDialog>
  <SearchDialogTrigger />
  <SearchContent />
  <SearchDialogOverlay />
</SearchDialog>
```

The outpost search component uses Radix UI under the hood to provide accessible component and simple usage. Check out their [ docs](https://www.radix-ui.com/primitives/docs/components/dialog) for information about the specific props the base component accepts.

## For AI Powered Search

```tsx
<SearchContent APIKey={API_KEY} cometId={COMET_IT} config={{ stream: true }} />
```

## License

Search.js is a project by [Outpost](https://outpost.run).

Released under the MIT License.
