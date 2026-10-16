# Memoization in React: Why It Matters for Performance

A small experiment that compares the same expensive computation **with** and **without** memoization, so you can see the performance difference in your own browser console.

## What This Project Demonstrates

In React, a component re-renders whenever its state or props change. If a component does expensive work on every render, such as filtering a large list or running a heavy calculation, that work is repeated even when its inputs haven't changed.

Memoization (`useMemo`, `useCallback`, `React.memo`) caches the result and reuses it until the inputs change. This project runs both approaches side by side and logs how long each one takes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)

### Installation and Running

From the project's root directory:

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

## How to Observe the Difference

1. Open the app in your browser.
2. Open DevTools (`F12`, or `Cmd + Option + I` on Mac) and go to the **Console** tab.
3. Trigger a re-render by interacting with the app by clicking the button.
4. Look for the two console log tags:
   - `Time taken without memo`
   - `Time taken with memo`
5. Both of them are getting logged for the first time. But on subsequent click of button, only `Time taken without memo` is getting logged which means with useMemo, the value has been cached and the calculation is not getting triggered everytime.

### What to expect

- **Without memo:** the expensive calculation runs on every render, so the time stays high.
- **With memo:** the calculation runs once, then the cached result is reused until its dependencies change, so the time drops sharply on later renders.

## Going Deeper with Profiling

Console timings are a quick check. For a fuller picture, try:

- **React DevTools Profiler:** Record an interaction and compare commit counts and render times, and enable "Record why each component rendered" to see what triggered each render.
- **Chrome Performance panel (React 19.2+):** Use the React performance tracks to see scheduling and per-component timing.

## Key Takeaways

- Memoization avoids repeating expensive work when inputs haven't changed.
- It only helps when the computation is actually costly. For cheap work, the cache bookkeeping can cost more than it saves.
- Memoization has a cost: extra memory and more code to maintain.
- Always measure before and after optimizing. Don't guess.

## When to Use Memoization

**Good candidates**

- Heavy calculations, or filtering and sorting large lists
- Components that re-render often with unchanged props
- Values passed to memoized children or used in dependency arrays

**Usually not worth it**

- Simple calculations
- Components that rarely re-render
- Values that change on nearly every render anyway

## Related: React Compiler

The [React Compiler](https://react.dev/learn/react-compiler) can add much of this memoization automatically at build time, which reduces the need for manual `useMemo` and `useCallback`. A good follow-up experiment is to enable it in this project and compare the results with the manual version.

## Tech Stack

- React
- Vite (dev server and build tool)

## Project Structure

```
.
├── src/
│   ├── App.jsx          # Main component with both versions
│   └── components
|.    |__Home.jsx
├── package.json
└── README.md
```

> Update this section to match your actual file layout.

## Part of My React Playground

This is one of several small experiments in my React playground repo, where I try out new React features and performance techniques as they release.
