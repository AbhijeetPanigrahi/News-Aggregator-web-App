module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    main: 'var(--color-primary-main)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                    muted: 'var(--color-primary-muted)',
                },
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                'surface-highlight': 'var(--color-surface-highlight)',
                border: 'var(--color-border)',
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                },
                accent: {
                    main: 'var(--color-primary-main)',
                    muted: 'var(--color-accent-muted)',
                }
            },
            boxShadow: {
                soft: 'var(--shadow-soft)',
            },
        },
    },
    plugins: [],
}
