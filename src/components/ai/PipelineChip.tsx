import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useHomework } from '../../context/HomeworkCtx';

/**
 * PipelineChip: displays status of a micro-service in the grading pipeline
 * Props:
 * - service: name of the micro-service
 */
export const PipelineChip: FC<{ service: string }> = ({ service }) => {
  const { state } = useHomework();
  const status = state.pipelineStatus[service] || 'idle';

  const statusIcon = () => {
    switch (status) {
      case 'running':
        return (
          <motion.div
            className="w-4 h-4 rounded-full border-2 border-accent"
            animate={{ rotate: 360 }}
            transition={{ loop: Infinity, duration: 1, ease: 'linear' }}
          />
        );
      case 'done':
        return (
          <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center text-white">
            ✓
          </div>
        );
      case 'error':
        return (
          <div className="w-4 h-4 rounded-full bg-error flex items-center justify-center text-white">
            !
          </div>
        );
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
      {statusIcon()}
      <span className="text-sm font-medium">{service}</span>
    </div>
  );
};
