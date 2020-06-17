module.exports = {
	preset: 'ts-jest',
	moduleNameMapper: {
		'^components/([^\\.]*)$': '<rootDir>/src/components/$1',
		'^testlib/([^\\.]*)$': '<rootDir>/testlib/$1',
	},
}
