module.exports = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/testlib/test-setup.js'],
	moduleNameMapper: {
		'^components/([^\\.]*)$': '<rootDir>/src/components/$1',
		'^testlib/([^\\.]*)$': '<rootDir>/testlib/$1',
	},
}
