// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactJsonPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import './Results.scss';

const Results = ({ data }) => {
  return (
    <section className="results">
      <h3>Headers</h3>
      <div className="response-content">
        <ReactJsonPretty data={data.headers} />
      </div>
      <h3>Results</h3>
      <div className="response-content">
        <ReactJsonPretty data={data.body} />
      </div>
    </section>
  );
};

export default Results;
