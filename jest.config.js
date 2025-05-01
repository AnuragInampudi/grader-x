/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'unit',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      testMatch: [
        '<rootDir>/src/tests/unit/**/*.(spec|test).{ts,tsx,js,jsx}'
      ],
    },
    {
      displayName: 'e2e',
      preset: 'ts-jest',
      testEnvironment: 'node',
      moduleFileExtensions: ['ts', 'js'],
      transform: {
        '^.+\\.(ts)$': 'ts-jest',
      },
      testMatch: [
        '<rootDir>/tests/**/*.e2e.ts'
      ],
      // drop testTimeout here; we’ll set it per-suite below
    },
  ],
  // you can add root-level options here if needed
};
