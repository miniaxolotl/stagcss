import sass from 'sass';
import glob from 'glob';

import { render } from '../lib/render';

const filename = 'nav.scss'
describe(`src/ext/_${filename}`, () => {
	it('compiles to CSS', () => {
		return render(`src/ext/_${filename}`);
	})
});