# aexos-core compatibility package

`aexos-core` is the legacy npm package name for AEXOS Core.

The canonical package is now `@aexos/core`. This compatibility package
keeps existing commands such as `npx github:CyryxLabs/AEXOS install` working by
delegating to the canonical package.

Recommended new command:

```bash
npx github:CyryxLabs/AEXOS install
```
