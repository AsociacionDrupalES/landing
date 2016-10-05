module.exports = function(grunt) {
	
  var host = 'http://site.local/';

	require('es6-promise').polyfill();

	grunt.initConfig({
		twig: {
    		dist: {
        		options: {
            		base: 'build'
        		}
    		}
		},
		watch: {
			dev: {
				files: ['src/**/*.sass'],
				tasks: ['sass_globbing','sass:dev'],
			},
			lint: {
				files: ['src/**/*.sass'],
				tasks: ['sasslint','sass:dev'],
			},
			twig: {
				
				tasks: ['twig'],
			},
		},
		sass: {
			dist: { 
				options: { 
					outputStyle: 'compressed',
				},
				files: { 
					'css/main.css': 'src/sass/main.sass',
				}
			},
			dev: { 
				options: { 
					outputStyle: 'expanded',
					sourceMap: true
				},
				files: { 
					'css/main.css': 'src/sass/main.sass',
				}
			}
		},
		sass_globbing: {
		    your_target: {
		      files: {
		        'src/sass/pages/_pages.sass': 'src/sass/pages/**/*.sass',
		        'src/sass/components/_components.sass': 'src/sass/components/**/**/*.sass',
		      },
		      options: {
		        useSingleQuotes: false,
		        signature: false,
		      }
		    }
		},
		sasslint: {
	        options: {
	            configFile: 'da_vinci.sass-lint.yml',
	        },
	        target: ['src/**/*.sass']
	    },
		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        'js/*.js',
                        'templates/**/*.twig'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: host,
                    ui: false,
                    injectChanges: false,
                }
            }
        },
        postcss: {
		    options: {
		      	map: false, // inline sourcemaps
				// or
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: 'dist/css/maps/' // ...to the specified directory
				},
			    processors: [
			        require('autoprefixer')({browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20']}), // add vendor prefixes
			    ]
		    },
		    dist: {
		    	src: 'css/main.css'
		    }
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-sass-globbing');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass-lint');
	grunt.loadNpmTasks('grunt-browser-sync');

	// Default task
	grunt.registerTask('default', ['browserSync','watch:dev']);

	// Watching task for dev (compile to expanded css with sourcemap)
	grunt.registerTask('dev', ['browserSync','watch:dev']);

	// Watching task for lint ()
	grunt.registerTask('lint', ['watch:lint']);

	// Task for production (compile to compressed css without sourcemap and prefixes)
	grunt.registerTask('dist', ['sass:dist', 'postcss']);
};
