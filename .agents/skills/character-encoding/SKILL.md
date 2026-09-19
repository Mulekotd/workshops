---
name: character-encoding
description: Use HTML character entities and Unicode escapes consistently for symbols in project source code.
---

# Character encoding

Keep visual symbols out of source as literal glyphs so their intent and encoding remain unambiguous.

## JSX markup

Use an HTML character entity for a symbol rendered as markup text.

```jsx
<button>Próximo &rarr;</button>
<small>WORKSHOP &bull; 01</small>
```

Use named entities when one exists and is clear; otherwise use a numeric entity such as `&#9776;`.

## JavaScript strings

Use Unicode escape notation for symbols inside JavaScript strings, including labels, configuration and static content.

```js
const message = "Carregando\u2026";
const warning = "\u26A0 Atenção";
```

Do not use HTML entities inside JavaScript strings: React renders them as literal text in that context. Do not alter ordinary accented letters, punctuation, URLs, code samples, or user-provided content unless the symbol itself is being encoded.

## Review

Before finishing, search source files for literal visual symbols such as arrows, bullets, ellipses, emoji and mathematical operators. Apply the context-appropriate representation above.
