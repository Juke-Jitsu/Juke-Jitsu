var gulp    = require('gulp');
var git     = require('gulp-git');
var install = require('gulp-install');
var shell   = require('gulp-shell');
var sequence= require('run-sequence');

var srvPath = './Server';
var clntPath = './Client';
var protoPath = './Protocols';
var snseiPath = './Sensei';

gulp.task('default', ['setup-core']);

gulp.task('setup-core', ['setup-protocols', 'setup-server', 'setup-client', 'setup-sensei'], function() {
   
    console.log("i did it?");

});

gulp.task('clone-repos', function(callback){

    //Protocols
    git.clone('http://github.com/Juke-Jitsu/Protocols', {args: protoPath}, function(err){
        if(err){
            console.log(err);
            console.log("Failed cloning http://github.com/Juke-Jitsu/Protocols:");
            console.log("Directory is not empty, skipping.\n");
        }
    });

    //Server
    git.clone('http://github.com/Juke-Jitsu/Server', {args: srvPath}, function(err){
        if(err){
            console.log(err);
            console.log("Failed cloning http://github.com/Juke-Jitsu/Server:");
            console.log("Directory is not empty, skipping.\n");
        }
    });

    //Client
    git.clone('http://github.com/Juke-Jitsu/Client', {args: clntPath}, function(err){
        if(err){
            console.log(err);
            console.log("Failed cloning http://github.com/Juke-Jitsu/Client:");
            console.log("Directory is not empty, skipping.\n");
        }
    });

    //Sensei
    git.clone('http://github.com/Juke-Jitsu/Sensei', {args: snseiPath}, function(err){
        if(err){
            console.log(err);
            console.log("Failed cloning http://github.com/Juke-Jitsu/Sensei:");
            console.log("Directory is not empty, skipping.\n");
        }
    });

    setTimeout(function(){
        callback();
    },5000);//nasty fix until gulp4 comes out with series execution

});

gulp.task('setup-protocols', ['clone-repos'], function(){

    gulp.src([protoPath+'/package.json'])
        .pipe(install())
        .pipe(gulp.dest(protoPath));
    shell.task([
            'echo $(pwd)',
            'npm link'
    ]);

});

gulp.task('setup-server', ['clone-repos', 'setup-protocols'], function(){

    gulp.src([srvPath+'/package.json'])
        .pipe(install())
        .pipe(gulp.dest(srvPath));
    shell.task([
            'echo $(pwd)',
            'npm link protocols'
    ]);
});

gulp.task('setup-client', ['clone-repos', 'setup-protocols'], function(){

    gulp.src([clntPath+'/package.json'])
        .pipe(install())
        .pipe(gulp.dest(clntPath));
    shell.task([
            'echo $(pwd)',
            'npm link protocols'
    ]);
});


gulp.task('setup-sensei', ['clone-repos'], function(){

    gulp.src([snseiPath+'/package.json'])
        .pipe(install())
        .pipe(gulp.dest(snseiPath));
});
