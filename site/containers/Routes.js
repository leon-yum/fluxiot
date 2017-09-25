import React from 'react';
import { browserHistory, HashRouter, Route, Switch } from 'react-router-dom';

import Splash from './Splash';

const exactPath = true;

const Routes = () => (
  <HashRouter history={browserHistory}>
    <Switch>
      <Route path="/" exact={exactPath} component={Splash} />
    </Switch>
  </HashRouter>
);

export default Routes;
