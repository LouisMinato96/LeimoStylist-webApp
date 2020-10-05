import React from 'react';

import classes from './Layout.module.scss';
import Aux from './../Auxilary/Auxilary';

const layout = (props) => {
  return (
    <Aux>
      <main className={classes.mainLayout} >
        {props.children}
      </main>
    </Aux>
  );
}

export default layout;