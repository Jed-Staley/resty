import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Components/Form';

describe('Form Component', () => {
  const mockHandleApiCall = jest.fn();

  test('renders Form component', () => {
    render(<Form handleApiCall={mockHandleApiCall} />);
    expect(screen.getByText('URL:')).toBeInTheDocument();
  });

  test('submits form with GET method', () => {
    render(<Form handleApiCall={mockHandleApiCall} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(screen.getByText('GO!'));
    expect(mockHandleApiCall).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon',
    });
  });
});
