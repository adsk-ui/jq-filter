var gulp = require("gulp"),
    babel = require("gulp-babel");

gulp.task("build", function() {
    return gulp.src("src/jqFilter.js")
        .pipe(babel({
        	"modules": "amd"
        }))
        .pipe(gulp.dest("dist"));
});
