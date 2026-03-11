# Paul Van Tuyl's Portfolio Site

A personal portfolio and blog site built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, hosted on GitHub Pages.

## Architecture

This project is migrating from Jekyll (legacy) to a modern React + Vite single-page application. The React app lives in the `src/` directory with components, pages, and styled content. Static assets serve from the `public/` directory and are deployed to GitHub Pages.

**Key Directories:**
- `src/` — React application source (components, pages, styling)
- `public/` — Static assets served by Vite (favicons, robots.txt, etc.)
- `_archive/` — Legacy Jekyll files (preserved for reference, not used in build)

## Local Development

### Setup

```bash
npm install          # Install dependencies
npm run dev         # Start Vite dev server (http://localhost:5173)
```

### Development Commands

```bash
npm run dev         # Start dev server with hot reload
npm run build       # Build for production (TypeScript check + Vite bundle)
npm run preview     # Preview production build locally
npm run lint        # Run ESLint and check code quality
npm run storybook   # Launch Storybook component library (if installed)
```

### Build Output

- Production build outputs to `dist/`
- All files from `public/` are included in the build
- Ready to deploy to GitHub Pages

## License

The following directories and their contents are Copyright Paul Van Tuyl. You may not reuse anything therein without my permission:

- _posts
- _assets
- _work
- Any of the apple-touch-icon* files
- favicon.ico

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
