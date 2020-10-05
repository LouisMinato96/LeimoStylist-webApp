import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import logo from './logo.svg';
import classes from './App.module.scss';
import Layout from './HOC/Layout/Layout';
import Home from './containers/Home/home';

function App() {
  return (
    <BrowserRouter>
      <div className={classes.LayOutContainer}>
        <Layout>
        <Route exact path="/" component={Home} />
          <img src={logo} alt="" />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
