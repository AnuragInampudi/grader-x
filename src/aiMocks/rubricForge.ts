/**
 * LLM-Rubric Forge: stub returns static rubric criteria.
 */
export async function LLM_RubricForge(): Promise<{ criteria: { name: string; weight: number }[] }> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            criteria: [
              { name: 'Clarity', weight: 30 },
              { name: 'Completeness', weight: 40 },
              { name: 'Accuracy', weight: 30 }
            ]
          }),
        500
      )
    );
  }
  