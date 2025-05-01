// src/tests/unit/Analytics.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Analytics from '../../pages/Analytics';
import { HomeworkProvider } from '../../context/HomeworkCtx';  // adjust if your path differs

describe('Analytics Module', () => {
  test('renders the dashboard heading', () => {
    render(
      <HomeworkProvider>
        <Analytics />
      </HomeworkProvider>
    );

    expect(
      screen.getByRole('heading', { name: /Analytics Dashboard/i })
    ).toBeInTheDocument();
  });
});
