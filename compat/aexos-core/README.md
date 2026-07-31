# aexos-core compatibility package

`aexos-core` is the legacy npm package name for AEXOS Core.

The canonical package is now `@aexos-squads/core`. This compatibility package
keeps existing commands such as `npx aexos-core@latest install` working by
delegating to the canonical package.

Recommended new command:

```bash
npx -y -p @aexos-squads/core@latest aexos install
```
