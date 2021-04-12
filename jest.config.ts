import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: [ 'ts', 'js', 'json', 'node' ],
	roots: [
		  'spec/'
	],
	coverageReporters: [
		'json',
		'text',
		'lcov',
		'clover'
	],
	verbose: true
};

export default config;