import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Components/Header';

describe('Header Component', () => {
  const history = { isEmpty: () => true, top: null };
  const recents = [];
  const mockOnHistoryClick = jest.fn();
  const mockOnRecentsClick = jest.fn();

  test('renders Header component', () => {
    render(
      <Header
        history={history}
        recents={recents}
        onHistoryClick={mockOnHistoryClick}
        onRecentsClick={mockOnRecentsClick}
      />
    );
    expect(screen.getByText('RESTy')).toBeInTheDocument();
  });

  test('opens and closes history dropdown', () => {
    render(
      <Header
        history={history}
        recents={recents}
        onHistoryClick={mockOnHistoryClick}
        onRecentsClick={mockOnRecentsClick}
      />
    );
    const historyButton = screen.getByText('History');
    fireEvent.click(historyButton);
    expect(screen.getByText('No history available')).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(screen.queryByText('No history available')).not.toBeInTheDocument();
  });

  test('opens and closes recents dropdown', () => {
    render(
      <Header
        history={history}
        recents={recents}
        onHistoryClick={mockOnHistoryClick}
        onRecentsClick={mockOnRecentsClick}
      />
    );
    const recentsButton = screen.getByText('Recents');
    fireEvent.click(recentsButton);
    expect(screen.getByText('No recent requests')).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(screen.queryByText('No recent requests')).not.toBeInTheDocument();
  });
});
