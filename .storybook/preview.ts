import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import '../src/App.css';

const preview: Preview = {
    tags: ["autodocs"],
    parameters: {
        backgrounds: {
            options: {
                dark: { name: "DarkBG", value: "#000000" },
                light: { name: "LightBG", value: "#ffffff" },
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: themes.dark,
            codePanel: true,
        },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
    },
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for components",
            defaultValue: "light",
            toolbar: {
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
            },
        },
    },
    decorators: [
        (StoryFn, context) => {
            const theme = context.globals.theme ?? "light";
            const root = document.documentElement;
            root.classList.toggle("dark", theme === "dark");
            return StoryFn();
        },
    ],
};

export default preview;
