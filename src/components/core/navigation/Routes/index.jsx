import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import withLoadable from 'HOCs/withLoadable';
import PATHS from 'constants/routes/paths';
import { Home } from 'screens';

const NotFound = withLoadable(() => import('screens/main/NotFound'));
const About = withLoadable(() => import('screens/static/About'));
const Terms = withLoadable(() => import('screens/static/Terms'));

function Routes() {
  return (
    <Switch>
      <Route component={About} path={PATHS.about} />
      <Route component={Home} exact path={PATHS.root} />
      <Route component={Terms} path={PATHS.terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
