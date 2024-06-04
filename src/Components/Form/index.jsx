// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Form.scss';

const Form = (props) => {
  const [method, setMethod] = useState('GET');

  const handleMethodClick = (e) => {
    setMethod(e.target.id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: 'https://pokeapi.co/api/v2/pokemon',
    };
    props.handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name='url' type='text' />
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
      </form>
    </>
  );
}

export default Form;
