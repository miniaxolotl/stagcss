import sass from 'sass';
import glob from 'glob';

import { render } from './lib/render';

const filename = 'stag-dark.scss'
describe(`src/${filename}`, () => {
	it('compiles to CSS', () => {
		return render(`src/${filename}`);
	})
});