// eslint-disable-next-line no-unused-vars
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Components/Form';

describe('Form Component', () => {
  it('renders without crashing', () => {
    render(<Form handleApiCall={vi.fn()} />);
    expect(screen.getByText('URL:')).toBeInTheDocument();
    expect(screen.getByText('GO!')).toBeInTheDocument();
  });

  it('calls handleApiCall with correct data on form submission', () => {
    const handleApiCall = vi.fn();
    render(<Form handleApiCall={handleApiCall} />);
    
    fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('GET'));
    fireEvent.submit(screen.getByRole('button', { name: 'GO!' }));

    expect(handleApiCall).toHaveBeenCalledWith({ method: 'GET', url: 'https://example.com', data: null });
  });

  it('changes method when a method button is clicked', () => {
    render(<Form handleApiCall={vi.fn()} />);
    
    fireEvent.click(screen.getByText('POST'));
    expect(screen.getByText('POST')).toHaveClass('active');
    
    fireEvent.click(screen.getByText('PUT'));
    expect(screen.getByText('PUT')).toHaveClass('active');
  });

  it('shows JSON data input for POST and PUT methods', () => {
    render(<Form handleApiCall={vi.fn()} />);
    
    fireEvent.click(screen.getByText('POST'));
    expect(screen.getByText('JSON Data:')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('PUT'));
    expect(screen.getByText('JSON Data:')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('GET'));
    expect(screen.queryByText('JSON Data:')).not.toBeInTheDocument();
  });

  it('handles JSON data input change correctly', () => {
    render(<Form handleApiCall={vi.fn()} />);
    
    fireEvent.click(screen.getByText('POST'));
    const textarea = screen.getByLabelText('JSON Data:');
    fireEvent.change(textarea, { target: { value: '{"key":"value"}' } });
    
    expect(textarea.value).toBe('{"key":"value"}');
  });

  it('calls handleApiCall with JSON data for POST method', () => {
    const handleApiCall = vi.fn();
    render(<Form handleApiCall={handleApiCall} />);
    
    fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('POST'));
    fireEvent.change(screen.getByLabelText('JSON Data:'), { target: { value: '{"key":"value"}' } });
    fireEvent.submit(screen.getByRole('button', { name: 'GO!' }));

    expect(handleApiCall).toHaveBeenCalledWith({ method: 'POST', url: 'https://example.com', data: { key: 'value' } });
  });

  it('calls handleApiCall with JSON data for PUT method', () => {
    const handleApiCall = vi.fn();
    render(<Form handleApiCall={handleApiCall} />);
    
    fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('PUT'));
    fireEvent.change(screen.getByLabelText('JSON Data:'), { target: { value: '{"key":"value"}' } });
    fireEvent.submit(screen.getByRole('button', { name: 'GO!' }));

    expect(handleApiCall).toHaveBeenCalledWith({ method: 'PUT', url: 'https://example.com', data: { key: 'value' } });
  });
});
