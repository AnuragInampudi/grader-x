/**
 * Code Runner: stub simulates test results.
 */
export async function CodeRunner(): Promise<{ passed: number; total: number; log: string }> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ passed: 7, total: 10, log: `Test 1 passed
  Test 2 failed
  ...` });
      }, 800)
    );
  }