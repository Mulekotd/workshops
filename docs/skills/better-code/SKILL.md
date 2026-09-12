---
name: better-code
description: Implement or revise project code with a focus on readable, maintainable React and JavaScript.
---

# Better Code

Write code that a teammate can understand and safely change without needing to reconstruct its intent.

## When implementing a feature

- Prefer clear names that expose purpose (`currentSlide`, `goToSlide`) over short or ambiguous names.
- Keep each component and function focused on one responsibility. Extract a component or helper when it removes meaningful repetition or makes a block easier to understand.
- Keep static data and configuration outside React components whenever practical.
- Make control flow explicit. Avoid dense one-line callbacks, nested ternaries, and implicit DOM-dependent behavior when a named function or value is clearer.
- Preserve the existing architecture and visual behavior unless the request asks to change them.

## React conventions

- Use semantic HTML, accessible button labels, and stable keys for lists.
- Keep state local to the smallest component that needs it. Derive values rather than storing duplicated state.
- Clean up timers, subscriptions, and event listeners created by effects.
- Use constants for repeated values and asset URLs. Pass data explicitly instead of extracting it from rendered DOM text.

## Before finishing

- Review changed JSX for readable formatting, coherent names, and unnecessary duplication.
- Run the project's relevant validation command when available.
