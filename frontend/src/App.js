import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';

import configureStore from './_store/configureStore';
import './App.css';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import Authentication from './components/authentication/Authentication';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <Switch>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/authentication" component={Authentication} />
            </Layout>
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default App;
