import React, { Component } from 'react';
import axios from 'axios';
import { Stack } from '../data-structures/stack';
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
      history: new Stack(),
      recents: [],
    };
  }

  callApi = async (requestParams, fromHistory = false) => {
    this.setState({ loading: true, requestMade: true, data: null });

    try {
      const response = await axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.data,
      });

      const newRequest = {
        url: requestParams.url,
        method: requestParams.method,
        jsonData: requestParams.data || null,
        responseHeaders: { ...response.headers, date: undefined }, // Remove date from response headers
        responseData: response.data,
        time: new Date().toISOString(), // Store as ISO string
        repeatCount: 1,
      };

      if (!fromHistory) {
        this.updateHistory(newRequest);
        this.updateRecents(requestParams);
      }

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

  updateHistory = (newRequest) => {
    const { history } = this.state;
    const currentTime = new Date();
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60000);

    let current = history.top;
    while (current) {
      const { data } = current;

      if (
        data.url === newRequest.url &&
        data.method === newRequest.method &&
        JSON.stringify(data.jsonData) === JSON.stringify(newRequest.jsonData) &&
        JSON.stringify({ ...data.responseHeaders, date: undefined }) === JSON.stringify(newRequest.responseHeaders) &&
        JSON.stringify(data.responseData) === JSON.stringify(newRequest.responseData)
      ) {
        if (new Date(data.time) > fiveMinutesAgo) {
          data.repeatCount += 1;
          data.time = newRequest.time;
          this.setState({ history });
          return;
        }
      }

      if (new Date(data.time) < fiveMinutesAgo) {
        break;
      }

      current = current.pointer;
    }

    history.push(newRequest);
    this.setState({ history });
  };

  updateRecents = (requestParams) => {
    this.setState((prevState) => ({
      recents: [{ ...requestParams, time: new Date().toISOString() }, ...prevState.recents],
    }));
  };

  handleHistoryClick = (historyItem) => {
    this.setState({
      data: {
        headers: historyItem.responseHeaders,
        body: historyItem.responseData,
      },
      requestParams: {
        url: historyItem.url,
        method: historyItem.method,
        data: historyItem.jsonData,
      },
      requestMade: true,
      loading: false,
    });
  };

  handleRecentsClick = (recentItem) => {
    this.callApi(recentItem, true);
  };

  render() {
    const { history, recents } = this.state;

    return (
      <React.Fragment>
        <Header
          history={history}
          recents={recents}
          onHistoryClick={this.handleHistoryClick}
          onRecentsClick={this.handleRecentsClick}
        />
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
