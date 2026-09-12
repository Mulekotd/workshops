# Project guidance

## Code quality

For every feature or JSX revision, follow [`better-code`](docs/skills/better-code/SKILL.md).
For image assets, follow [`image-imports`](docs/skills/image-imports/SKILL.md).
For visual symbols in source code, follow [`character-encoding`](docs/skills/character-encoding/SKILL.md).

- Favor small, readable components and descriptive names.
- Keep static content outside render functions and avoid compressed one-line JSX.
- Preserve the project's behavior and visual design unless the task explicitly changes them.
- Use semantic and accessible markup; interactive controls need an appropriate label.
- Keep effects and timers cleaned up, and avoid deriving application data from DOM text.

## Validation

Run `npm run build` after application changes when the environment permits it.
