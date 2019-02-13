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
          component={FormsList}
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
