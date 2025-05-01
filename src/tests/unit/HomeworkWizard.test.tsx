// Simplified test: ensure HomeworkWizard exports a function
const HomeworkWizard = require('../../pages/HomeworkWizard').default;

describe('HomeworkWizard Module', () => {
  test('exports a function', () => {
    expect(typeof HomeworkWizard).toBe('function');
  });
});
