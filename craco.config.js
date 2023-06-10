const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
	webpack: {
		configure: {
			entry: './src'
		},
		alias: {
			'@components': resolvePath('./src/components'),
			'@assets': resolvePath('./src/assets'),
			'@store': resolvePath('./src/store'),
			'@styles': resolvePath('./src/styles'),
			'@utils': resolvePath('./src/utils'),
			'@pages': resolvePath('./src/pages'),
		},
	}
} 