"use strict";

module.exports = function (grunt) {
  require("time-grunt")(grunt);

  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
  });

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          "css/styles.css": "css/styles.scss",
        },
      },
    },
    watch: {
      files: "css/*.scss",
      tasks: ["sass"],
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/scripts.js"],
        },
        options: {
          watchTask: true,
          server: { baseDir: "./" },
        },
      },
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            src: ["*.html"],
            dest: "dist/",
          },
        ],
      },
      fonts: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "node_modules/font-awesome",
            src: ["fonts/*.*"],
            dest: "dist/",
          },
        ],
      },
    },
    clean: {
      build: {
        src: ["dist/"],
      },
    },
    imagemin: {
      dynamin: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            src: ["img/*.{png,jpg,gif}"],
            dest: "dist/",
          },
        ],
      },
    },
    useminPrepare: {
      foo: {
        dest: "dist/",
        src: ["index.html", "contact.html", "explore.html", "book.html"],
      },
      options: {
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
          post: {
            css: [
              {
                name: "cssmin",
                createConfig: function (context, block) {
                  var generated = context.options.generated;
                  generated.options = {
                    keepSpecialComments: 0,
                    rebase: false,
                  };
                },
              },
            ],
          },
        },
      },
    },
    concat: {
      options: {
        seperator: ";",
      },
      dest: {},
    },
    uglify: {
      dest: {},
    },
    cssmin: {
      dest: {},
    },
    filerev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 20,
      },
      release: {
        files: [
          {
            src: ["dist/js/*.js", "dist/css/*.css"],
          },
        ],
      },
    },
    usemin: {
      html: [
        "dist/index.html",
        "dist/contact.html",
        "dist/explore.html",
        "dist/book.html",
      ],
      options: {
        assestDirs: ["dist", "dist/js", "dist/css"],
      },
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
        },
        files: {
          "dist/index.html": "dist/index.html",
          "dist/book.html": "dist/book.html",
          "dist/explore.html": "dist/explore.html",
          "dist/contact.html": "dist/contact.html",
        },
      },
    },
  });
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin",
  ]);
};
