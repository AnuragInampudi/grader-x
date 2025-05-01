import { useState, useEffect } from 'react';
import { useHomework } from '../context/HomeworkCtx';
import { LLM_RubricForge, EssayLLMGrader, CodeRunner, PlagiarismGuard, KnowledgeTracer, StudyPlanGenerator } from '../api';

/**
 * Hook to run selected AI services in parallel and update context state.
 */
export function usePipeline() {
  const { state, dispatch } = useHomework();

  useEffect(() => {
    const { selectedServices } = state;
    if (selectedServices.length === 0) return;

    // Map service names to actual functions
    const serviceMap: Record<string, () => Promise<any>> = {
      LLM_RubricForge,
      EssayLLMGrader,
      CodeRunner,
      PlagiarismGuard,
      KnowledgeTracer,
      StudyPlanGenerator
    };

    // Initialize statuses
    selectedServices.forEach((svc) =>
      dispatch({ type: 'SET_PIPELINE_STATUS', payload: { service: svc, status: 'running' } })
    );

    // Run all services
    Promise.all(
      selectedServices.map((svc) =>
        serviceMap[svc]().then((res) => ({ service: svc, res }))
      )
    )
      .then((results) => {
        results.forEach(({ service, res }) => {
          dispatch({ type: 'ADD_RESULT', payload: { service, res } });
          dispatch({ type: 'SET_PIPELINE_STATUS', payload: { service, status: 'done' } });
        });
      })
      .catch((error) => {
        console.error('Pipeline error:', error);
        selectedServices.forEach((svc) =>
          dispatch({ type: 'SET_PIPELINE_STATUS', payload: { service: svc, status: 'error' } })
        );
      });
  }, [state.selectedServices, dispatch]);
}
