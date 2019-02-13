import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import styles from './App.scss';
import * as routes from '../../routes/routes';
import FormsList from '../FormsList/FormsList';
import FormBuilder from '../FormBuilder/FormBuilder';

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.list}
          component={FormsList}
        />

        <Route
          path={routes.builder}
          component={FormBuilder}
        />

        <Route
          exact
          path={routes.root}
          component={FormsList}
        />

        <Route
          component={() => (<h1 style={{textAlign: 'center'}}>Page not found 😳</h1>)}
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
