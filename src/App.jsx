import React from 'react';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = (requestParams) => {
    // mock output
    const data = {
      count: 2,
      results: [
        { name: 'fake thing 1', url: 'http://fakethings.com/1' },
        { name: 'fake thing 2', url: 'http://fakethings.com/2' },
      ],
    };
    this.setState({ data, requestParams });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <section>
          <div>Request Method: {this.state.requestParams.method}</div>
          <div>URL: {this.state.requestParams.url}</div>
        </section>
        <div className="response-container">
          <Results data={this.state.data} />
        </div>
        <Form handleApiCall={this.callApi} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
