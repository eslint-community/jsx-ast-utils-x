---
"jsx-ast-utils-x": patch
---

Stop logging a spurious `console.error` when extracting an empty JSX expression
container (e.g. `{/* a comment */}`). `JSXEmptyExpression` is now mapped to a
no-op extractor instead of falling through to the "could not be resolved" error
path. Also updated that error message to point at this fork's issue tracker
(`eslinter/jsx-ast-utils-x`) rather than the upstream `jsx-eslint/jsx-ast-utils`.
