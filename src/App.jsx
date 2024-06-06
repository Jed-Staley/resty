import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
      requestMade: false,
      loading: false,
    };
  }

  callApi = async (requestParams) => {
    this.setState({ loading: true, requestMade: true, data: null });

    try {
      const response = await axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.data,
      });
      this.setState({
        data: {
          headers: response.headers,
          body: response.data,
        },
        requestParams,
        loading: false,
      });
    } catch (error) {
      this.setState({
        data: {
          headers: {},
          body: { error: error.message },
        },
        requestParams,
        loading: false,
      });
    }
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
