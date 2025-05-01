/**
 * Ensure rubric weights sum to exactly 100%.
 */
export function validateWeights(weights: number[]): boolean {
    return weights.reduce((sum, w) => sum + w, 0) === 100;
  }
  