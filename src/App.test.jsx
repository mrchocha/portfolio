import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders every portfolio section', () => {
    render(<App />);
    for (const id of ['home', 'experience', 'projects', 'opensource', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it('lists the projects from projects.json', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Jailer' })).toBeInTheDocument();
    expect(screen.getByText('Open source')).toBeInTheDocument();
  });
});
