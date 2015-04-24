var gulp = require("gulp"),
    babel = require("gulp-babel");

gulp.task("build", function() {
    return gulp.src("src/jqFilter.js")
        .pipe(babel({
        	"modules": "amd",
        	"loose": ["es6.modules"] // needed for IE8
        }))
        .pipe(gulp.dest("dist"));
});
