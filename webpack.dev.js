const path = require('path');
require('dotenv').config()

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public/'),
		},
		compress: true,
		port: 4040,
		proxy: {
			'/api': {
			 secure: false,
			 changeOrigin: true,
			 target: 'http://localhost:4040',
			 router: () => "http://backend.grbpwr.com:8081",
			}
		   },
	},
};
