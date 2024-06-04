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
      requestMade: false,
      loading: false, // New state variable to track loading
    };
  }

  callApi = (requestParams) => {
    this.setState({ loading: true, requestMade: true }); // Set loading to true when request is made

    // Simulate an API call with mock data
    const data = {
      count: 2,
      results: [
        { name: 'fake thing 1', url: 'http://fakethings.com/1' },
        { name: 'fake thing 2', url: 'http://fakethings.com/2' },
      ],
    };
    this.setState({ data, requestParams, loading: false }); // Set loading to false when data is received
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Form handleApiCall={this.callApi} />
        {this.state.requestMade && (
          <>
            <section>
              <div>Request Method: {this.state.requestParams.method}</div>
              <div>URL: {this.state.requestParams.url}</div>
            </section>
            <div className="response-container">
              {this.state.loading ? (
                <p>Loading...</p>
              ) : (
                <Results data={this.state.data} />
              )}
            </div>
          </>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
