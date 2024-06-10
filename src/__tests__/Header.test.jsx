// eslint-disable-next-line no-unused-vars
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Components/Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header history={{ isEmpty: () => true }} recents={[]} onHistoryClick={vi.fn()} onRecentsClick={vi.fn()} />);
    expect(screen.getByText('RESTy')).toBeInTheDocument();
  });

  it('toggles history dropdown', () => {
    render(<Header history={{ isEmpty: () => true }} recents={[]} onHistoryClick={vi.fn()} onRecentsClick={vi.fn()} />);
    
    const historyButton = screen.getByText('History');
    fireEvent.click(historyButton);
    expect(screen.getByText('No history available')).toBeInTheDocument();
    
    fireEvent.click(historyButton);
    expect(screen.queryByText('No history available')).not.toBeInTheDocument();
  });

  it('toggles recents dropdown', () => {
    render(<Header history={{ isEmpty: () => true }} recents={[]} onHistoryClick={vi.fn()} onRecentsClick={vi.fn()} />);
    
    const recentsButton = screen.getByText('Recents');
    fireEvent.click(recentsButton);
    expect(screen.getByText('No recent requests')).toBeInTheDocument();
    
    fireEvent.click(recentsButton);
    expect(screen.queryByText('No recent requests')).not.toBeInTheDocument();
  });

  it('calls onRecentsClick when a recent item is clicked', () => {
    const mockRecents = [{ url: 'https://example.com', time: '2024-06-09T12:00:00Z' }];
    const onRecentsClick = vi.fn();
    render(<Header history={{ isEmpty: () => true }} recents={mockRecents} onHistoryClick={vi.fn()} onRecentsClick={onRecentsClick} />);
    
    fireEvent.click(screen.getByText('Recents'));
    fireEvent.click(screen.getByText('https://example.com'));

    expect(onRecentsClick).toHaveBeenCalledWith(mockRecents[0]);
  });

  it('handles click outside to close dropdowns', () => {
    render(<Header history={{ isEmpty: () => true }} recents={[]} onHistoryClick={vi.fn()} onRecentsClick={vi.fn()} />);
    
    const historyButton = screen.getByText('History');
    fireEvent.click(historyButton);
    expect(screen.getByText('No history available')).toBeInTheDocument();
    
    fireEvent.mouseDown(document);
    expect(screen.queryByText('No history available')).not.toBeInTheDocument();
  });
});
