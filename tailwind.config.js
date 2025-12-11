module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
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
                border: 'var(--color-border)', // Ensure this variable exists in index.css
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                },
                accent: {
                    main: 'var(--color-primary-main)', // Mapping accent.main to primary.main as per theme.js
                    muted: 'var(--color-accent-muted)',
                }
            },
            boxShadow: {
                soft: 'var(--shadow-soft)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
