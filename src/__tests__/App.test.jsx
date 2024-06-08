import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('RESTy')).toBeInTheDocument();
  });

  test('makes an API call and displays results', async () => {
    render(<App />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(screen.getByText('GO!'));
    expect(await screen.findByText(/Request Method/)).toBeInTheDocument();
    expect(await screen.findByText(/URL/)).toBeInTheDocument();
  });
});
