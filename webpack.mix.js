const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
	.webpackConfig({
		module: {
			rules:[
				{
					test: /\.txt$/i,
					use: ['raw-loader'],
				},
				{
					test: /\.csv$/i,
					loader: 'csv-loader',
					options: {
						dynamicTyping: true,
						header: false,
						skipEmptyLines: false,
					},
				},
				{
					test:/\.twig$/,
					use:['twig-loader']
				},
				{
					test: /\.jsx$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								'@babel/preset-env'
							]
						}
					}]
				}
			]
		},
		resolve: {
			fallback: {
				"fs": false,
				"path": false,
				"crypto": false,
				"stream": false,
			}
		}
	})


	// --------------------------------------
	// Theme Script
	.js('src_front/theme.js', 'resources/')
	.sass('src_front/theme.scss', 'resources/')

	// --------------------------------------
	// Directory Suggestion
	.js('src_front/directory_suggestion/directory_suggestion.js', 'resources/directory_suggestion/')
	.sass('src_front/directory_suggestion/directory_suggestion.scss', 'resources/directory_suggestion/')

	// --------------------------------------
	// Project form
	.js('src_front/project_form/project_form.js', 'resources/project_form/')
	.sass('src_front/project_form/project_form.scss', 'resources/project_form/')

	// --------------------------------------
	// Schedule form
	.js('src_front/schedule_form/schedule_form.js', 'resources/schedule_form/')
	.sass('src_front/schedule_form/schedule_form.scss', 'resources/schedule_form/')

	// --------------------------------------
	// Scheduler
	.js('src_front/scheduler/scheduler.js', 'resources/scheduler/')
	.sass('src_front/scheduler/scheduler.scss', 'resources/scheduler/')


	// --------------------------------------
	// Static Frontend Libraries
	.copyDirectory('vendor/tomk79/remote-finder/dist', 'resources/remote-finder')
	.copyDirectory('node_modules/@tomk79/common-file-editor/dist', 'resources/common-file-editor')
	.copyDirectory('node_modules/gitui79/dist', 'resources/gitui79.js')
	.copyDirectory('node_modules/gitparse79/dist', 'resources/node-git-parser')
;
