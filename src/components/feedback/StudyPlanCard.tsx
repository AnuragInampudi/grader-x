import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StudyPlanCard: expandable card showing remedial action items
 * Props:
 * - items: array of strings representing plan steps
 */
export const StudyPlanCard: React.FC<{ items: string[] }> = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      <button
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-medium">Study Plan</span>
        <span className="transform transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          ▶
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 py-4 list-disc list-inside bg-white"
          >
            {items.map((item, idx) => (
              <li key={idx} className="py-1 text-sm text-gray-700">
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};