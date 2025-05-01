// src/tests/unit/App.spec.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('App – tab navigation', () => {
  test('default tab shows the “Create Assignment Rubric” step', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Create Assignment Rubric/i })
    ).toBeInTheDocument();
  });

  test('clicking “Grade Submissions” shows Grade Studio', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Grade Submissions/i }));
    expect(
      screen.getByRole('heading', { name: /Grade Studio/i })
    ).toBeInTheDocument();
  });

  test('clicking “Analytics” shows Analytics Dashboard', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Analytics/i }));
    expect(
      screen.getByRole('heading', { name: /Analytics Dashboard/i })
    ).toBeInTheDocument();
  });
});
