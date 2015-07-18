module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        transport:{
            options:{
                paths:["modules"]
            },
            build:{
                files:[
                    {
                        expand:true,
                        cwd:"modules",
                        src: ['**/*.js', '!seajs/*'],
                        dest: ".build"
                    }
                ]
            }
        },
        concat:{
            a:{
                options:{
                    paths: [".build"],
                    include:"all"
                },
                files:[
                    {
                        expand: true,
                        cwd: ".build",
                        src: ['a/a.js'],
                        dest: "../min/modules/"
                    }
                ]
            },
            jquery:{
                options:{
                    paths: [".build"],
                    include:"all"
                },
                files:[
                    {
                        expand: true,
                        cwd: ".build",
                        src: ['jquery/jquery.js'],
                        dest: "../min/modules"
                    }
                ]
            },
            common:{
                options:{
                    paths: [".build"],
                    include:"all"
                },
                files:[
                    {
                        expand: true,
                        cwd: ".build",
                        src: ['**/*.js'],
                        dest: "../min/modules"
                    }
                ]
            }
        },
        uglify:{
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "../min/modules",
                        src: ['**/*.js'],
                        dest: "../min/modules"
                    }
                ]
            }
        },
        copy:{
            build: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: "modules",
                        src: ['seajs/sea.js'],
                        dest: "../min/modules",
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean:['.build']
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['transport','concat','uglify', 'copy']);
}