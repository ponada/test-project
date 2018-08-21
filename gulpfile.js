"use strict";

var gulp = require("gulp");
const svgSprite = require('gulp-svg-sprite');
var cheerio = require('gulp-cheerio');
const gulpIf = require('gulp-if');
var del = require("del");
var node_env = require("./gulp/tools/node_env")("dev", ["dev", "git", "sourcemaps", "production"]);
var cg = require("./gulp/tools/config");
var tasks = [];

gulp.task("clean", function(){
    return del(cg.other.build);
});

gulp.task('watch', function(){

    for (var t in cg) {
        if (cg.hasOwnProperty(t)) {
            if (t === "other") continue;

            var task = cg[t];

            task.add && gulp.watch(task.watch, gulp.series(task.name));

        }
    }

});
gulp.task('spritesvg', function () {
    return gulp.src('src/sprite-svg/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'sprite.svg',
                    render: {
                        scss: {
                            dest: '_sprite_svg.scss',
                            template: 'src/styles/sass/sprite-svg/_spritesvgtemp.scss'
                        }
                    }
                }
            },
            shape: {
                dimension: {
                    maxWidth: 32,
                    maxHeight: 32
                }
            }
        }))
        .pipe(gulpIf('*.scss', gulp.dest('src/styles/sass/sprite-svg'), gulp.dest('build/images')));
});

function lazyLoadTask(add, name, path, index, options, taskOptions){
    options = options || {};
    options.env = node_env;
    options.name = name;
    options.taskOptions = taskOptions;

    if (add){
        gulp.task(name, function(callback){
            var stream = require(path)(options);
            return stream(callback);
        });

        tasks.push({
            name: name,
            index: index
        });
    }

}

for (var t in cg){
    if (cg.hasOwnProperty(t)){
        if (t === "other") continue;

        var task = cg[t];

        lazyLoadTask(
            task.add,
            task.name,
            task.path,
            task.index,
            {
                src: task.src,
                build: task.build
            },
            task
        );

    }
}

tasks.sort(function(a, b){ return a.index > b.index; });
tasks = tasks.map(function(value){ return value.name; });

tasks.unshift("clean");
if (node_env.dev){
    tasks.push('spritesvg');
    tasks.push("watch");
}

gulp.task("default", gulp.series.apply(gulp, tasks));