// eslint-disable-next-line no-unused-vars
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, prettyDOM } from '@testing-library/react';
import Results from '../Components/Results';

describe('Results Component', () => {
  it('renders headers and results', () => {
    const mockData = {
      headers: { 'content-type': 'application/json' },
      body: { message: 'Success' },
    };

    render(<Results data={mockData} />);

    console.log(prettyDOM(document.body)); // Log the DOM tree for debugging

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText(/content-type/i)).toBeInTheDocument();
    expect(screen.getByText(/application\/json/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    const mockData = {
      headers: {},
      body: {},
    };

    render(<Results data={mockData} />);

    console.log(prettyDOM(document.body)); // Log the DOM tree for debugging

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.queryByText(/content-type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message/i)).not.toBeInTheDocument();
  });

  it('displays the correct data format', () => {
    const mockData = {
      headers: { 'content-type': 'application/json' },
      body: { message: 'Test' },
    };

    render(<Results data={mockData} />);

    console.log(prettyDOM(document.body)); // Log the DOM tree for debugging

    const headersElement = screen.getByText('Headers');
    const resultsElement = screen.getByText('Results');
    const headerContent = screen.getByText(/content-type/i);
    const bodyContent = screen.getByText(/message/i);

    expect(headersElement).toBeInTheDocument();
    expect(resultsElement).toBeInTheDocument();
    expect(headerContent).toBeInTheDocument();
    expect(bodyContent).toBeInTheDocument();
    expect(screen.getByText(/application\/json/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('renders with empty headers and body', () => {
    const mockData = {
      headers: {},
      body: {},
    };

    render(<Results data={mockData} />);

    console.log(prettyDOM(document.body)); // Log the DOM tree for debugging

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.queryByText(/content-type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message/i)).not.toBeInTheDocument();
  });
});
