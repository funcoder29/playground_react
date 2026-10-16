# React Compiler Demo: Automatic Memoization

A small experiment showing that the [React Compiler](https://react.dev/learn/react-compiler) memoizes expensive calculations **automatically**, with no `useMemo`, `useCallback` or `React.memo` written by hand.

A `console.log` inside the calculation proves it: with the compiler enabled, the calculation runs **once** and the cached result is reused on re-renders that don't change its inputs.

## What This Project Demonstrates

- A component performs an expensive calculation during render.
- The component re-renders for reasons unrelated to that calculation (for example, typing in an input or toggling a button).
- **Compiler off:** the calculation runs again on every re-render.
- **Compiler on:** the calculation runs once, then the cached result is reused until its inputs change.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm
- React 19 (for React 17 or 18, the compiler needs extra configuration. See the [docs](https://react.dev/learn/react-compiler)).

### Install and Run

From the project's root directory:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## How the Compiler Is Enabled

The compiler is a build-time Babel plugin. It is installed with:

```bash
npm install -D babel-plugin-react-compiler@latest
```

And configured in `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});
```

> Check that this matches your actual setup. The exact config depends on your build tool and the plugin version.

## How to Observe the Result

1. Open the app in your browser.
2. Open DevTools (`F12`, or `Cmd + Option + I` on Mac) and go to the **Console** tab.
3. Note the calculation log printed on the first render.
4. Trigger re-renders that don't affect the calculation's inputs (type in the input, click the counter button, and so on).
5. Watch the console:
   - **Compiler on:** no new calculation log appears. The result is reused.
   - **Compiler off:** a new log appears on every re-render.
6. Change the input that the calculation depends on. The calculation **should** run again, because its dependency changed. This confirms the cache is being invalidated correctly.

### Expected console output

| Action                   | Compiler off           | Compiler on      |
| ------------------------ | ---------------------- | ---------------- |
| Initial load             | Calculation logs       | Calculation logs |
| Unrelated state change   | Calculation logs again | No new log       |
| Another unrelated change | Calculation logs again | No new log       |
| Dependency changes       | Calculation logs       | Calculation logs |

> **Note on React Strict Mode:** in development, Strict Mode intentionally renders components twice to catch bugs, so you may see the log **twice** on the first render. That is expected and not a compiler issue. The important comparison is what happens on later re-renders.

## Compare Compiler On vs Off

To see the difference clearly, run the app both ways:

1. **With the compiler:** run as configured above and record the logs.
2. **Without the compiler:** remove `'babel-plugin-react-compiler'` from the Vite config (or comment it out), restart `npm run dev`, and repeat the same interactions.

You can also opt a single component out while the compiler stays on, by adding this as the first line of the function:

```jsx
function MyComponent() {
  "use no memo";
  // ...
}
```

## Confirming the Compiler Is Working

- **React DevTools:** install the React Developer Tools extension. Components optimized by the compiler show a **"Memo ✨"** badge in the **Components** tab.
- **Profiler:** record the same interaction with the compiler on and off, then compare commits and render times in the **Profiler** tab.

## Troubleshooting

- **Logs still appear on every re-render:** check that the plugin is actually in your config, restart the dev server, and look for the "Memo ✨" badge. The compiler skips components that break the Rules of React (such as mutating props or state during render).
- **Component isn't compiled:** run `npx react-compiler-healthcheck@latest` and check the ESLint rules in `eslint-plugin-react-hooks` for violations.
- **Log appears twice on load:** that's Strict Mode in development. See the note above.

## Key Takeaways

- The compiler memoizes values and components automatically, so you write less `useMemo` and `useCallback` by hand.
- It relies on your code following the Rules of React: pure components, with no mutation of props or state.
- Existing manual memoization still works, so you don't have to remove it.
- Always measure with logs or the Profiler rather than assuming the optimization helps.

## Tech Stack

- React 19
- Vite
- babel-plugin-react-compiler

## Project Structure

```
├── src/
│   ├── App.jsx          # Component with the logged calculation
│   └── components
|     |__Home.jsx
├── vite.config.js.       # Compiler plugin configured here
├── package.json
└── README.md
```

## Part of My React Playground

This is one of several small experiments in my React playground repo, where I try out new React features and performance techniques as they release.
