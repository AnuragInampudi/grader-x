import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHomework } from '../../context/HomeworkCtx';

/**
 * AIConfigModal: allows tweaking mock service parameters
 * Props:
 * - isOpen: whether modal is visible
 * - onClose: callback to close modal
 */
export function AIConfigModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [seed, setSeed] = useState<number>(42);
  const [delay, setDelay] = useState<number>(500);
  const { dispatch } = useHomework();

  // Apply and propagate config via context
  const applyConfig = () => {
    dispatch({ type: 'SET_MOCK_CONFIG', payload: { seed, delay } });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure AI Mocks">
      {/* Overview */}
      <p className="mb-4 text-gray-600 text-sm">
        <strong>Configure AI Mocks</strong> lets you control how our mock grading services behave:
      </p>
      <div className="space-y-4">
        {/* Random Seed Input */}
        <div>
          <label className="block text-sm font-medium">Random Seed</label>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            A seed value to initialize the random generator. Using the same seed ensures consistent mock outputs across runs.
          </p>
        </div>

        {/* Response Delay Input */}
        <div>
          <label className="block text-sm font-medium">Response Delay (ms)</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            Simulated latency for each mock service response. Increase to test loading states, decrease for faster runs.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
          Cancel
        </button>
        <button onClick={applyConfig} className="px-4 py-2 rounded bg-accent text-white">
          Apply Settings
        </button>
      </div>
    </Modal>
  );
}

