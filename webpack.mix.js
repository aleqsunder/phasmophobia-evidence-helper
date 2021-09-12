const mix = require('laravel-mix')

mix.options({processCssUrls: false})
mix.sass('src/scss/style.sass', 'dist/css')
mix.js('src/js/app.js', 'dist/js/app.min.js').vue()