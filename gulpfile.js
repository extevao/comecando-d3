var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['serve'], function() {
    console.log('olá');
});
gulp.task('serve', function() {

    browserSync.init({
        // browser: ["google chrome", "firefox", "opera"],
        browser: ["google-chrome"],
        server: {
            baseDir: "./app",
        }

    });

    gulp.watch("app/**").on("change", reload);
});
