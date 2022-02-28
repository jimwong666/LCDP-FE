import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
	title: 'LCDP',
	mode: 'site',
	outputPath: 'docs',
	base: '/lcdp',
	publicPath: '/lcdp/',
	resolve: {
		includes: ['docs-sources'],
	},
	alias: {
		'@lcdp-rc': path.resolve(__dirname, 'packages/lcdp-rc/src'),
	},
	// more config: https://d.umijs.org/config
});
