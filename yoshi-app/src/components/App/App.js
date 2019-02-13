import React from 'react';
import styles from './App.scss';
import FormsList from '../FormsList/FormsList';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/list"
          component={FormsList}
        />

        <Route
          exact
          path="/"
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
