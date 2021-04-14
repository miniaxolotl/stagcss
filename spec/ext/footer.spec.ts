import { render } from '../lib/render';

const filename = 'progress.scss';

describe(`src/ext/${filename}`, () => {
	it('compiles to CSS', () => {
		return render(`src/ext/${filename}`);
	})
});