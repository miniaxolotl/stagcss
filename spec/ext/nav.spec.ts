import { render } from '../lib/render';

const filename = 'nav.scss';

describe(`src/ext/${filename}`, () => {
	it('compiles to CSS', () => {
		return render(`src/ext/_${filename}`);
	})
});