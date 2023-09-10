module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            textColor: {
                skin: {
                    base: 'var(--color-text-base)',
                    inverted: 'var(--color-text-inverted)'
                }
            },
            backgroundColor: {
                skin: {
                    fill: 'var(--color-fill)',
                    button: 'var(--color-button)',
                    ['primary-hover']: 'var(--color-button-primary-hover)',
                    ['primary']: 'var(--color-button-primary)'
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}