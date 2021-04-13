import glob from 'glob';

import { render } from './lib/render';

describe('sass/core/*', () => {
	const components = glob.sync('src/core/*.scss');
	
	it.each(components)('%s compiles to CSS', (file) => {
		render(file);
	})
});