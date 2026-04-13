# Copilot Instructions for paulvantuyl.github.io

## Project Overview

This is a **personal website migrating from Jekyll to React**:
- **Current branch (reactapp):** React + TypeScript + Vite SPA in `src/` directory with component-based architecture
- **Legacy (master branch):** Jekyll-based static site with Liquid templates - **DO NOT MODIFY**

The site lives at `https://paulvantuyl.github.io` (GitHub Pages) and showcases Paul Van Tuyl's portfolio, blog posts, and work history.

**⚠️ IMPORTANT:** Focus all development work on the React application in `src/` and `public/`. Ignore Jekyll files (`_includes/`, `_layouts/`, `_posts/`, `scss/`, `_config.yml`, `gulpfile.js`) - they are legacy artifacts.

## Critical Architecture Decisions

### Build System
- **React/Vite:** Primary system using Vite for dev/build, outputs to `dist/`, managed by `package.json` scripts
- **Deployment:** GitHub Pages pipeline (not yet configured, work in progress)
- Jekyll legacy files exist in repository but are not part of active development

### React App Structure (`src/`)
```
src/
├── App.tsx              # Router setup with ThemeProvider (next-themes)
├── App.css              # Global styles with Tailwind v4 @theme overrides
├── components/          # Reusable UI components
│   ├── Layout/          # Page wrapper with Navbar + document chrome
│   ├── Navbar/          # Navigation with Base UI primitives
│   └── Button/          # Base button with forwardRef pattern
├── pages/               # Route components (Home, Work, Colors, Weblog)
└── content/posts/       # Duplicated markdown posts from _posts/
```

### Styling Philosophy (Work in Progress)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Custom design tokens in [src/App.css](src/App.css) using `@theme` directive (not traditional `@layer`)
- Design system inspired by retro computing aesthetic:
  - `.document` class for content chrome
  - Custom colors: `--color-primary` (#C11A35), `--color-border-color`
- **No standard Tailwind utilities redefined** - App.css uses CSS variables heavily
- Base UI used for accessible primitives
- **Note:** Design system is actively evolving; expect changes to color palettes and spacing

## Component Patterns

### Layout Component ([src/components/Layout/Layout.tsx](src/components/Layout/Layout.tsx))
- Wraps all pages with `<Navbar />` and document-style chrome
- Props: `children: ReactNode`, `documentTitle?: string` (defaults to "hello_world.md")

### Component Organization
- Each component lives in own folder: `ComponentName/` with `ComponentName.tsx` and optional `.types.ts`
- Use `forwardRef` for components that need ref forwarding (see [Button](src/components/Button/Button.tsx))
- Export from [src/components/index.ts](src/components/index.ts) for clean imports

## Development Workflow

### Commands
```bash
npm run dev        # Vite dev server (React app)
npm run build      # TypeScript check + Vite build
npm run lint       # ESLint on .ts/.tsx files
npm run preview    # Preview production build
```

**Deployment:** GitHub Pages pipeline not yet configured - avoid using `npm run deploy` until proper workflow is established.

### TypeScript Configuration
- Uses project references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`
- Target: ES2022, JSX: react-jsx

## Key Conventions

### Routing
- Using `react-router-dom` v7 with `<BrowserRouter>`
- Routes defined in [src/App.tsx](src/App.tsx): `/` (Home), `/Work`, `/colors`
- Navigation uses `<Link>` from react-router with `isActive()` helper for styling

### Theme Management
- Dark mode via `next-themes` ThemeProvider (attribute="class", defaultTheme="system", enableSystem)
- Follows OS-level dark/light preference changes automatically
- Tailwind configured for `class` dark mode strategy
- CSS variables change based on `.dark` class on root element

### Naming & Styling
- **No inline Tailwind utilities in custom CSS** - use CSS variables from `@theme`
- Component classNames combine Tailwind utilities with custom classes
- Use semantic HTML: `<small>`, `<dl>`, `<cite>` with custom styling in App.css

### Content Management
- Blog posts live in `src/content/posts/` - these are markdown files copied from Jekyll `_posts/`
- React will eventually parse these markdown files to render blog content
- **Do not modify** Jekyll `_posts/` directory - it's legacy only
- When adding new posts, create them only in `src/content/posts/`

## Integration Points

### External Dependencies
- **Base UI**: Used for accessible component primitives (@base-ui/react)
- **Tailwind CSS v4**: Latest version with new `@theme` syntax, not `@layer` directives
- **Vite**: Primary bundler with `@vitejs/plugin-react` and `@tailwindcss/vite`

### Asset Handling
- Static assets in `public/` (Vite convention)
- Legacy `assets/` folder exists from Jekyll but may need migration to `public/`
- Navbar currently references `/assets/phvt-triangle-white.svg` - ensure path compatibility with Vite's public directory serving

## Debugging Tips

### Common Issues
- **Missing styles**: Check if custom classes exist in [src/App.css](src/App.css), not in Tailwind config
- **Routing 404s**: Ensure `<BrowserRouter>` is properly configured (currently at root level)
- **Dark mode not working**: Verify ThemeProvider wraps router and `next-themes` is imported
- **Build errors**: Check tsconfig references - requires both app and node configs

### ESLint Configuration
- Flat config format in [eslint.config.js](eslint.config.js) using `defineConfig`
- Uses recommended configs for React Hooks and React Refresh
- Global ignore: `dist/`

## Project-Specific Anti-Patterns
touch Jekyll files - focus exclusively on React migration in `src/`  
❌ **Don't** use `@apply` in CSS - this project uses direct CSS variables  
❌ **Don't** modify Tailwind config files - customization happens via `@theme` in App.css  
❌ **Don't** add inline styles - prefer Tailwind utilities or CSS variables  
❌ **Don't** modify `_posts/` or other Jekyll directories - they're legacy artifacts

## Work in Progress Areas

These features are actively being developed:
- **GitHub Pages deployment pipeline** - build/deploy workflow not finalized
- **Design system** - colors, spacing, and component patterns are evolving
- **Blog rendering** - markdown parsing for `src/content/posts/` not yet implemented
- **Asset migration** - some assets may still need moving from `assets/` to `public/`sts/` and `src/content/posts/`?
4. **Asset paths**: Will assets work in both Jekyll output and Vite build?
