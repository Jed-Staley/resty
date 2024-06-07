import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';

const Header = ({ history, recents, onHistoryClick, onRecentsClick }) => {
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  const [isRecentsDropdownOpen, setIsRecentsDropdownOpen] = useState(false);
  const historyRef = useRef();
  const recentsRef = useRef();

  const toggleHistoryDropdown = () => {
    setIsHistoryDropdownOpen(!isHistoryDropdownOpen);
    setIsRecentsDropdownOpen(false);
  };

  const toggleRecentsDropdown = () => {
    setIsRecentsDropdownOpen(!isRecentsDropdownOpen);
    setIsHistoryDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      (historyRef.current && !historyRef.current.contains(event.target)) &&
      (recentsRef.current && !recentsRef.current.contains(event.target))
    ) {
      setIsHistoryDropdownOpen(false);
      setIsRecentsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderHistory = () => {
    if (!history || history.isEmpty()) {
      return <li>No history available</li>;
    }

    let current = history.top;
    const historyItems = [];
    while (current) {
      const { url, time, repeatCount } = current.data;
      historyItems.push(
        <li
          key={time + url}
          onClick={() => {
            onHistoryClick(current.data);
            setIsHistoryDropdownOpen(false);
          }}
        >
          <div>{url}{repeatCount > 1 && ` (x${repeatCount})`}</div>
          <div>{new Date(time).toLocaleString()}</div>
        </li>
      );
      current = current.pointer;
    }
    return historyItems;
  };

  const renderRecents = () => {
    if (!recents || recents.length === 0) {
      return <li>No recent requests</li>;
    }

    return recents.map((recent) => (
      <li
        key={recent.time + recent.url}
        onClick={() => {
          onRecentsClick(recent);
          setIsRecentsDropdownOpen(false);
        }}
      >
        <div>{recent.url}</div>
      </li>
    ));
  };

  return (
    <header>
      <h1>RESTy</h1>
      <button className="history-button" onClick={toggleHistoryDropdown}>
        History
      </button>
      {isHistoryDropdownOpen && (
        <div className="history-dropdown" ref={historyRef}>
          <ul>{renderHistory()}</ul>
        </div>
      )}
      <button className="recents-button" onClick={toggleRecentsDropdown}>
        Recents
      </button>
      {isRecentsDropdownOpen && (
        <div className="recents-dropdown" ref={recentsRef}>
          <ul>{renderRecents()}</ul>
        </div>
      )}
    </header>
  );
};

export default Header;
