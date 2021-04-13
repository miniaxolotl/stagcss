import { render } from '../lib/render';

const filename = 'color.scss';

describe(`src/core/${filename}`, () => {
	it('compiles to CSS', () => {
		return render(`src/core/${filename}`);
	})
});