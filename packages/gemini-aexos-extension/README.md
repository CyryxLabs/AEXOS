# AEXOS (Cyryx) Gemini CLI Extension

Brings AEXOS multi-agent orchestration to Gemini CLI.

## Installation

```bash
gemini extensions install github.com/CyryxLabs/AEXOS/packages/gemini-aexos-extension
```

Or manually copy to `~/.gemini/extensions/cyryx/`

## Features

### Quick Agent Launcher
Use slash commands for fast activation flow (Codex `$`-like UX):
- `/aexos-menu` - show all quick launch commands
- `/aexos-dev`
- `/aexos-architect`
- `/aexos-qa`
- `/aexos-devops`
- `/aexos-master`
- and other `/aexos-<agent-id>` commands

Each launcher returns a ready-to-send activation prompt plus greeting preview.

### Commands
- `/aexos-status` - Show system status
- `/aexos-agents` - List available agents
- `/aexos-validate` - Validate installation
- `/aexos-menu` - Show quick launch menu
- `/aexos-agent <id>` - Generic launcher by agent id

### Hooks
Automatic integration with AEXOS memory and security:
- Session context loading
- Gotchas and patterns injection
- Security validation (blocks secrets)
- Audit logging

## Requirements

- Gemini CLI v0.26.0+
- AEXOS Core installed (`npx github:CyryxLabs/AEXOS install`)
- Node.js 18+

## Cross-CLI Compatibility

AEXOS skills work identically in both Claude Code and Gemini CLI. Same agents, same commands, same format.

## License

MIT
