import React, { useState } from 'react';
import { useHomework } from '../context/HomeworkCtx';
import Button from '../components/common/Button';

/**
 * Analytics page: shows grade distribution, plagiarism heat, knowledge forecast
 */
export default function Analytics() {
  const { state } = useHomework();
  const [view, setView] = useState<'distribution' | 'plagiarism' | 'knowledge'>('distribution');

  // Type-safe extractions from state.results
  const gradeRes = state.results.find((r) => r.service === 'EssayLLMGrader')?.res as { score: number } | undefined;
  const plagRes = state.results.find((r) => r.service === 'PlagiarismGuard')?.res as { match: number; sources: string[] } | undefined;
  const tracerRes = state.results.find((r) => r.service === 'KnowledgeTracer')?.res as Record<string, number> | undefined;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
      <p className="text-gray-600">
        Explore class performance metrics across three interactive views. Choose a view below to get started.
      </p>

      {/* View toggles */}
      <div className="flex space-x-2">
        <Button variant={view === 'distribution' ? 'primary' : 'secondary'} onClick={() => setView('distribution')}>
          Grade Distribution
        </Button>
        <Button variant={view === 'plagiarism' ? 'primary' : 'secondary'} onClick={() => setView('plagiarism')}>
          Plagiarism Heat
        </Button>
        <Button variant={view === 'knowledge' ? 'primary' : 'secondary'} onClick={() => setView('knowledge')}>
          Knowledge Forecast
        </Button>
      </div>

      {/* Grade Distribution */}
      {view === 'distribution' && (
        <div>
          <h3 className="text-xl font-medium">Grade Distribution</h3>
          <p className="text-gray-600 text-sm mb-2">
            View the spread of student scores for this assignment. High and low bars indicate clusters of performance.
          </p>
          {gradeRes ? (
            <p>Score: {gradeRes.score}%</p>
          ) : (
            <p className="text-gray-500">No grading data available.</p>
          )}
        </div>
      )}

      {/* Plagiarism Heat Map */}
      {view === 'plagiarism' && (
        <div>
          <h3 className="text-xl font-medium">Plagiarism Heat Map</h3>
          <p className="text-gray-600 text-sm mb-2">
            See similarity percentages against known sources. Investigate submissions with high match rates.
          </p>
          {plagRes ? (
            <ul className="list-disc list-inside">
              <li>Match: {plagRes.match}%</li>
              {plagRes.sources.map((src, i) => (
                <li key={i}>
                  <a href={src} className="text-info underline" target="_blank" rel="noreferrer">
                    Source {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No plagiarism data available.</p>
          )}
        </div>
      )}

      {/* Knowledge Tracer Forecast */}
      {view === 'knowledge' && (
        <div>
          <h3 className="text-xl font-medium">Knowledge Tracer Forecast</h3>
          <p className="text-gray-600 text-sm mb-2">
            Predicted mastery probabilities per topic. Use these insights to tailor remedial activities.
          </p>
          {tracerRes ? (
            <ul className="list-disc list-inside">
              {Object.entries(tracerRes).map(([topic, prob]) => (
                <li key={topic}>{topic}: {(prob * 100).toFixed(1)}%</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No knowledge tracer data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

