import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from '../Components/Results';

describe('Results Component', () => {
  test('renders Results component with data', () => {
    const data = {
      headers: { 'content-type': 'application/json' },
      body: { name: 'Pikachu' },
    };
    render(<Results data={data} />);
    expect(screen.getByText(/"name": "Pikachu"/)).toBeInTheDocument();
  });

  test('renders Results component without data', () => {
    render(<Results data={null} />);
    expect(screen.queryByText(/"name": "Pikachu"/)).not.toBeInTheDocument();
  });
});
