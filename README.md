# Svelte Datagrid

An experimental datagrid library aiming to improve developer experience over
existing libraries while maintaining great performance and good customisability.

## Developing

This library recommends Bun.

```bash
bun run dev
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
bun run package
```

To create a production version of your showcase app:

```bash
bun run build
```

You can preview the production build with `bun preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
