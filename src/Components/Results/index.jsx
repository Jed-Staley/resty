// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Results.scss';

const Results = (props) => {
  return (
    <section>
      <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
  );
}

export default Results;
