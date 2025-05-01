/**
 * API wrapper: toggles between mock services and real API implementations.
 * Currently configured to use mocks only.
 */

import { LLM_RubricForge as mockRubricForge } from '../aiMocks/rubricForge';
import { EssayLLMGrader as mockEssayGrader } from '../aiMocks/essayGrader';
import { CodeRunner as mockCodeRunner } from '../aiMocks/codeRunner';
import { PlagiarismGuard as mockPlagiarismGuard } from '../aiMocks/plagiarismGuard';
import { KnowledgeTracer as mockKnowledgeTracer } from '../aiMocks/knowledgeTracer';
import { StudyPlanGenerator as mockStudyPlanGenerator } from '../aiMocks/studyPlanGen';

// Toggle this flag when real implementations are available
const useMocks = true;

// Assign either mock or real services (real not implemented yet)
const apiServices = useMocks
  ? {
      LLM_RubricForge: mockRubricForge,
      EssayLLMGrader: mockEssayGrader,
      CodeRunner: mockCodeRunner,
      PlagiarismGuard: mockPlagiarismGuard,
      KnowledgeTracer: mockKnowledgeTracer,
      StudyPlanGenerator: mockStudyPlanGenerator
    }
  : {
      // realRubricForge,
      // realEssayGrader,
      // realCodeRunner,
      // realPlagiarismGuard,
      // realKnowledgeTracer,
      // realStudyPlanGenerator
      LLM_RubricForge: mockRubricForge,
      EssayLLMGrader: mockEssayGrader,
      CodeRunner: mockCodeRunner,
      PlagiarismGuard: mockPlagiarismGuard,
      KnowledgeTracer: mockKnowledgeTracer,
      StudyPlanGenerator: mockStudyPlanGenerator
    };

// Export each service for easy import
export const {
  LLM_RubricForge,
  EssayLLMGrader,
  CodeRunner,
  PlagiarismGuard,
  KnowledgeTracer,
  StudyPlanGenerator
} = apiServices;

