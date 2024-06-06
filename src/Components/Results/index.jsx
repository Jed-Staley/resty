// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactJsonPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css'; // Import the dark theme
import './Results.scss';

const Results = ({ data }) => {
  return (
    <section className="results">
      <h3>Headers</h3>
      <ReactJsonPretty data={data.headers} />
      <h3>Results</h3>
      <ReactJsonPretty data={data.body} />
    </section>
  );
};

export default Results;
