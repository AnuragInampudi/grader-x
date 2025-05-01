import React, { useState } from 'react';
import { LLM_RubricForge } from '../api';
import { Input } from '../components/common/Input';
import Button from '../components/common/Button';
import { validateWeights } from '../utils/validators';

interface RubricCriterion {
  name: string;
  weight: number;
}

/**
 * HomeworkWizard: multi-step form to draft and edit a rubric
 */
export default function HomeworkWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [rubric, setRubric] = useState<RubricCriterion[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Step 1: Draft rubric from answer key
   */
  const handleDraft = async () => {
    setLoading(true);
    try {
      const { criteria } = await LLM_RubricForge();
      setRubric(criteria);
      setStep(2);
    } catch (e) {
      setError('Failed to draft rubric. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update a rubric criterion locally
   */
  const updateCriterion = (index: number, field: 'name' | 'weight', value: string) => {
    const newRubric = rubric.map((c, i) =>
      i === index
        ? { ...c, [field]: field === 'weight' ? Number(value) : value }
        : c
    );
    setRubric(newRubric);
  };

  /**
   * Step 2: Finish and validate weights sum to 100
   */
  const handleFinish = () => {
    const weights = rubric.map((c) => c.weight);
    if (!validateWeights(weights)) {
      setError('Rubric weights must sum to 100%.');
      return;
    }
    setError(null);
    setStep(3);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Create Assignment Rubric</h2>
      {/* Intro instructions */}
      <p className="text-gray-600">
        The Rubric Wizard will guide you through three steps: auto-draft criteria,
        refine names & weights, then finalize your rubric.
      </p>

      {step === 1 && (
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Step 1: Auto-Draft Criteria</h3>
          <p className="text-gray-600">
            Provide an answer key and click below to generate initial rubric criteria.
            You can tweak them in the next step.
          </p>
          <Button onClick={handleDraft} disabled={loading}>
            {loading ? 'Drafting...' : 'Draft Rubric from Answer Key'}
          </Button>
        </div>
      )}

      {step >= 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Step 2: Refine & Weight</h3>
          <p className="text-gray-600">
            Edit each criterion and assign a percentage weight. Make sure the total
            across all criteria equals <strong>100%</strong>.
          </p>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Criterion</th>
                <th className="px-2 py-1 text-left">Weight (%)</th>
              </tr>
            </thead>
            <tbody>
              {rubric.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="px-2 py-1">
                    <Input
                      variant="outline"
                      value={c.name}
                      onChange={(e) => updateCriterion(i, 'name', e.target.value)}
                      label=""
                    />
                  </td>
                  <td className="px-2 py-1">
                    <Input
                      variant="outline"
                      type="number"
                      min={0}
                      max={100}
                      value={c.weight}
                      onChange={(e) => updateCriterion(i, 'weight', e.target.value)}
                      label=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {error && <p className="text-error">{error}</p>}

          {step === 2 && (
            <Button onClick={handleFinish} className="mt-2">
              Finish Rubric
            </Button>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <p className="text-success font-medium">Rubric created successfully!</p>
              <p className="text-gray-600">
                You can now switch to the <strong>Grade Submissions</strong> tab to
                use this rubric with your AI micro-services.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

