// src/context/HomeworkCtx.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

/**
 * Shape of the app's context state
 */
export interface HomeworkState {
  submissions: File[];
  pipelineStatus: Record<string, 'idle' | 'running' | 'done' | 'error'>;
  results: Array<{ service: string; res: any }>;
  selectedServices: string[];
  mockConfig: { seed: number; delay: number };
}

/**
 * Action types for reducer
 */
export type Action =
  | { type: 'ADD_SUBMISSION'; payload: File }
  | { type: 'SET_PIPELINE_STATUS'; payload: { service: string; status: 'idle' | 'running' | 'done' | 'error' } }
  | { type: 'ADD_RESULT'; payload: { service: string; res: any } }
  | { type: 'SET_SELECTED_SERVICES'; payload: string[] }
  | { type: 'SET_MOCK_CONFIG'; payload: { seed: number; delay: number } };

/**
 * Initial context state
 */
export const initialState: HomeworkState = {
  submissions: [],
  pipelineStatus: {},
  results: [],
  selectedServices: [],
  mockConfig: { seed: 42, delay: 500 }
};

/**
 * Reducer handling state transitions
 */
function reducer(state: HomeworkState, action: Action): HomeworkState {
  switch (action.type) {
    case 'ADD_SUBMISSION':
      return { ...state, submissions: [...state.submissions, action.payload] };
    case 'SET_PIPELINE_STATUS':
      return {
        ...state,
        pipelineStatus: { ...state.pipelineStatus, [action.payload.service]: action.payload.status }
      };
    case 'ADD_RESULT':
      return { ...state, results: [...state.results, action.payload] };
    case 'SET_SELECTED_SERVICES':
      return { ...state, selectedServices: action.payload };
    case 'SET_MOCK_CONFIG':
      return { ...state, mockConfig: { seed: action.payload.seed, delay: action.payload.delay } };
    default:
      return state;
  }
}

// Create and export context
const HomeworkCtx = createContext<{ state: HomeworkState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

/**
 * Provider component wrapping the application
 */
export const HomeworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <HomeworkCtx.Provider value={{ state, dispatch }}>{children}</HomeworkCtx.Provider>;
};

/**
 * Custom hook to consume the homework context
 */
export function useHomework() {
  const context = useContext(HomeworkCtx);
  if (!context) {
    throw new Error('useHomework must be used within a HomeworkProvider');
  }
  return context;
}

