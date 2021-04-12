import gulp, { src, dest, watch } from 'gulp';

import path from 'path';
import { Transform } from 'stream';
import sass from 'sass';

import pkg from './package.json';

const fileComment = `/**
 * stagcss v${pkg.version}
 * https://stagcss.dev
 * https://github.com/songmawa/stagcss
 *
 * Copyright 2021 Elias Mawa <elias@emawa.io>
 * Licensed under the GPL-3.0 license
 */
`;

interface Args {
	theme?: 'dark' | 'default' | true;
	minify?: boolean;
};

const args = ((_args) => {
	let args: Args = {};
	let lastOption: string | null = null;
	for(const i in _args) {
		const option = _args[i].replace(/^\-+/, '');
		const param = _args[i].trim();
		if(lastOption && param === option) {
			args[lastOption] = param;
		} else {
			args[option] = true;
			lastOption = option;
		}
	}
	return args;
})(process.argv.slice(3));

interface SassifyOptions {
	minify?: boolean;
};

const sassify = (options: SassifyOptions = {}) => {
	return new Transform({
		objectMode: true,
		transform: (chunk, encoding, callback) => {
			try {
				const result = sass.renderSync({
					file: chunk.path,
					outputStyle: options.minify ? 'compressed' : 'expanded'
				});
				chunk._contents = result.css;
				chunk.path = path.join(
					path.dirname(chunk.path),
					path.basename(chunk.path, path.extname(chunk.path))
					+ (options.minify ? '.min.css' : '.css')
				);
				return callback(null, chunk);
			} catch (err) {
				return callback(new Error(err));
			}
		}
	});
};

interface CommentOptions {
	comment?: string;
};

const comment = (options: CommentOptions = {}) => {
	return new Transform({
		objectMode: true,
		transform: (chunk, encoding, callback) => {
			try {
				const message = Buffer.from(options.comment ? options.comment : '');
				const output = [ message, chunk._contents ];
				chunk._contents = Buffer.concat(output);
				return callback(null, chunk);
			} catch (error) {
				return callback(new Error('yikes!'));
			}
		}
	});
};

/*******************************************************************************
 * TASKS
 *******************************************************************************/

gulp.task('build', () => {
	console.log(args);
	
	const filepath = ((name) => {
		if (args.theme === 'dark') {
			return `src/${name}-dark.scss`;
		} else {
			return `src/${name}.scss`;
		}
	})('stag');

	return gulp.src(filepath)
	.pipe(sassify({ minify: args.minify}))
	.pipe(comment({ comment: fileComment }))
	.pipe(dest('dist/'));
});