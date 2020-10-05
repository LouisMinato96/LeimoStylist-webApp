import React from 'react';

import logo from './logo.svg';
import classes from './App.module.scss';
import Layout from './HOC/Layout/Layout';

function App() {
  return (
    <div className={classes.LayOutContainer}>
      <Layout>
        <img src={logo} alt="" />
      </Layout>
    </div>
  );
}

export default App;
