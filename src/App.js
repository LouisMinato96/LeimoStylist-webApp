import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// import logo from './logo.svg';
import classes from './App.module.scss';
import Layout from './HOC/Layout/Layout';
import Home from './containers/Home/home';
import CreateLook from './containers/create-look/create-look';

function App() {
  return (
    <BrowserRouter>
      <div className={classes.LayOutContainer}>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/create-look" component={CreateLook} />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
