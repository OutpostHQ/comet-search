# Comet Search

This component allows you to communicate with the Outpost Comet API using the `outpostkit` SDK.

## React Component

### Anatomy

```tsx
<SearchDialog>
  <SearchDialogTrigger />
  <SearchContent />
  <SearchDialogOverlay />
</SearchDialog>
```

The outpost search component uses Radix UI under the hood to provide accessible component and simple usage. Check out their [ docs](https://www.radix-ui.com/primitives/docs/components/dialog) for information about the specific props the base component accepts.

**SearchContent**

```tsx
<SearchContent APIKey={API_KEY} cometId={COMET_IT} config={{ stream: true }} />
```
