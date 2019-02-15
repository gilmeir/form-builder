import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import styles from './App.scss';
import * as routes from '../../routes/routes';
import FormsList from '../FormsList/FormsList';
import FormBuilder from '../FormBuilder/FormBuilder';
import * as formsActions from '../../actions/forms';

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.list}
          render={() => <FormsList getForms={formsActions.getForms}/>}
        />

        <Route
          path={routes.builder}
          render={() => <FormBuilder saveForm={formsActions.saveForm}/>}
        />

        <Route
          exact
          path={routes.root}
          render={() => <FormsList getForms={formsActions.getForms}/>}
        />

        <Route
          component={() => (<h1 style={{textAlign: 'center'}}>Page not found 😳</h1>)}
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
