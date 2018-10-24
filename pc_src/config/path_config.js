module.exports = {
    // html
    html_src_dev: [
        './src/**/*.html',
        '!./src/include/*.html'
    ],
    html_dest_dev: '../pc/dev',
    html_src_build: ['../pc/dev/**/*.html'],
    html_dest_build: '../pc',
    html_rev_build: ['../pc/rev/*.json', '../pc/**/*.html'],
    // css
    sass_src_dev: [
        './src/static/sass/index.scss',
        './src/static/sass/common.scss'
    ],
    sass_dest_dev: '../pc/dev/static/css',
    sass_src_build: '../pc/dev/static/css/*.css',
    sass_dest_build: '../pc/static/css',
    // images
    images_src_dev: './src/static/images/**/*.{png,jpg,gif,ico,jpeg}',
    images_dest_dev: '../pc/dev/static/images',
    images_src_build: '../pc/dev/static/images/**/*.{png,jpg,gif,ico,jpeg}',
    images_dest_build: '../pc/static/images',
    // js
    js_src_dev: './src/static/js/**/*.js',
    js_dest_dev: '../pc/dev/static/js',
    js_src_build: '../pc/dev/static/js/**/*.js',
    js_dest_build: '../pc/static/js',
    // rev
    rev_build: '../pc/rev'
};