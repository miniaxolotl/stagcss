import sass from 'sass';
import glob from 'glob';

export const render = (filename: string) => {
	return new Promise<sass.Result>((resolve, reject) => {
		sass.render({
			file: filename,
			outputStyle: 'compressed'
		}, (err, result) => {
			if(err) {
				reject(err)
			} else {
				resolve(result);
			}
		});
	})
}