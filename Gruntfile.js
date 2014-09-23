module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ["covervid.min.js"],

		uglify: {
			dist: {
				files: {
					'covervid.min.js': ['covervid.js']
				}
			}
		},

		watch: {
			dist: {
				files: 'covervid.js',
				tasks: ['clean', 'uglify', 'watch']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'uglify', 'watch']);
	grunt.registerTask('publish', ['clean', 'uglify']);

};