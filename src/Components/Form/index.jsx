// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Form.scss';

const Form = (props) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [jsonData, setJsonData] = useState('');

  const handleMethodClick = (e) => {
    setMethod(e.target.id);
  };

  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      data: jsonData && (method === 'POST' || method === 'PUT') ? JSON.parse(jsonData) : null,
    };
    props.handleApiCall(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>URL: </span>
        <input name="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <button type="submit">GO!</button>
      </label>
      <div className="methods">
        <button
          type="button"
          id="GET"
          onClick={handleMethodClick}
          className={method === 'GET' ? 'active' : ''}
        >
          GET
        </button>
        <button
          type="button"
          id="POST"
          onClick={handleMethodClick}
          className={method === 'POST' ? 'active' : ''}
        >
          POST
        </button>
        <button
          type="button"
          id="PUT"
          onClick={handleMethodClick}
          className={method === 'PUT' ? 'active' : ''}
        >
          PUT
        </button>
        <button
          type="button"
          id="DELETE"
          onClick={handleMethodClick}
          className={method === 'DELETE' ? 'active' : ''}
        >
          DELETE
        </button>
      </div>
      {(method === 'POST' || method === 'PUT') && (
        <label>
          <span>JSON Data: </span>
          <textarea
            name="jsonData"
            rows="10"
            cols="50"
            value={jsonData}
            onChange={handleJsonChange}
          />
        </label>
      )}
    </form>
  );
};

export default Form;
