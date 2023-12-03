const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        '**/*.html',
        './src/**/*.js',
        './src/**/*.safelist',
    ],
    css: [
        './src/css/common.css',
    ],
    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ],
};