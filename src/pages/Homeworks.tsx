import React, { useState } from 'react';
import Button from '../components/common/Button';
import GradeStudio from './GradeStudio';
import HomeworkWizard from './HomeworkWizard';
import Analytics from './Analytics';

/**
 * Homeworks page: tabbed interface for creating assignments,
 * grading submissions, and viewing analytics.
 */
export default function Homeworks() {
  // Tab state: 'create' | 'grade' | 'analytics'
  const [tab, setTab] = useState<'create' | 'grade' | 'analytics'>('create');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Homework Grader X</h1>

      {/* Introductory text */}
      <p className="text-lg text-gray-600">
        Welcome to <strong>Homework Grader X</strong> — your AI‑First grading studio. Use the tabs below to:
      </p>
      <ul className="list-disc list-inside ml-6 text-gray-600">
        <li><strong>Create Assignment</strong>: draft & refine rubrics</li>
        <li><strong>Grade Submissions</strong>: run AI micro‑services on student work</li>
        <li><strong>Analytics</strong>: explore class performance</li>
      </ul>

      {/* Navigation tabs */}
      <div className="flex space-x-2">
        <Button
          variant={tab === 'create' ? 'primary' : 'secondary'}
          onClick={() => setTab('create')}
        >
          Create Assignment
        </Button>
        <Button
          variant={tab === 'grade' ? 'primary' : 'secondary'}
          onClick={() => setTab('grade')}
        >
          Grade Submissions
        </Button>
        <Button
          variant={tab === 'analytics' ? 'primary' : 'secondary'}
          onClick={() => setTab('analytics')}
        >
          Analytics
        </Button>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tab === 'create' && <HomeworkWizard />}
        {tab === 'grade' && <GradeStudio />}
        {tab === 'analytics' && <Analytics />}
      </div>
    </div>
  );
}

