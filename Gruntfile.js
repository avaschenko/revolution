module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	
	grunt.initConfig({

		autoprefixer: {
			options: {
				browsers: ["last 2 version", "ie 10"]
			},
			source: {
				src: "build/css/screen.css"
			}
		},
		
		cssmin: {
			style: {
				options: {
					keepSpecialComments: 0,
					report: "gzip"
				},
				files: {
					"build/css/screen.css" : ["build/css/screen.css"]
				}
			}
		},
		
		cmq: {
			style: {
				files: {
					"build/css/style.css" : ["build/css/style.css"]
				}
			}
		},
		
		csscomb: {
			dist: {
				options: {
					config: '.csscomb.json'
				},
				files: {
					"source/less/components/*.less" : ["source/less/components/*.less"]
				}
			}
		},
		
		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ["build/img/**/*.{png,jpg,gif,svg}"]
				}]
			}
		},
		
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				caseSensitive: true,
				keepClosingSlash: false
			},
			html: {
				files: {
					"build/index.min.html" : "build/index.html"
				}
			}
		},
		
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: "source",
					src: [
						"img/**",
						"js/**",
						"index.html",
                        "css/screen.css"
						
					],
					dest: "build"
				}]
			}
		},
		
		ucss: {

			simple: {
				pages: {
					crawl: 'build/index.html',
				},
				css: ['build/css/*.css']
			}

		},
		
		sprite:{
			all: {
				src: 'source/img/*.png',
				dest: 'source/img/sprites.png',
				destCss: 'source/sass/lib/sprites.sass',
				padding: 15,
				algorithm: "top-down"
			}
		},
		
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd: 'source/img/',
					src: ['*.svg'],
					dest: "source/img/sprites-svg"
				}],
				options: {
					svgo: true,
					pngcrush: true
				}
			}
		},


		watch: {
			style: {
				files: ['source/less/**/*.less'],
				tasks: ['style'],
				options: {
					spawn: false,
					livereload: true
				},
			},
			html: {
				files: ['source/*.html'],
				options: {
					spawn: false,
					livereload: true
				},
			},
		},



		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'source/css/*.css',
						'source/js/*.js',
						'source/*.html',
					]
				},
				options: {
					watchTask: true,
					server: {
						// baseDir: "build/",
					},
					notify: false,
					startPath: "source/index.html",
					ghostMode: {
						clicks: true,
						forms: true,
						scroll: false
					}
				}
			}
		},
		includes: {
			options: {
				debug: false
			},
			multiple_paths: {
				src: ['source/html/index.html'],
				dest: 'source/index.html',
				options: {
					includePath: [
						"source/blocks"
					]
				}
			}
		}
	});

	grunt.registerTask('default', [
		'less',
		'autoprefixer',
		'browserSync',
		'watch',
	]);
	
	grunt.registerTask('style', [
		"less",
		'autoprefixer',
	]);
	
	grunt.registerTask('optimization', [
        "copy",
        "autoprefixer",
		"cssmin"
	]);
	
};