/**
 * Knowledge Tracer: stub returns mastery probability per topic.
 */
export async function KnowledgeTracer(): Promise<Record<string, number>> {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve({ 'topic1': 0.7, 'topic2': 0.4, 'topic3': 0.9 }),
      550)
    );
  }
  