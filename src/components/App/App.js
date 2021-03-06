import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import * as qs from 'qs';
import styles from './App.scss';
import * as routes from '../../routes/routes';
import FormsList from '../FormsList/FormsList';
import FormBuilder from '../FormBuilder/FormBuilder';
import FormSubmit from '../FormSubmit/FormSubmit';
import FormSubmissions from '../FormSubmissions/FormSubmissions';
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
          path={routes.formSubmitUrl(':id')}
          render={({match, history}) =>
            <FormSubmit
              formId={match.params.id}
              onSubmit={formsActions.submitForm}
              redirectTo={history.push}
              getFormFields={formsActions.getForm}
            />
          }
        />

        <Route
          path={routes.submissions}
          render={({match, location}) =>
            <FormSubmissions
              formId={getQueryParams(location).formId}
              getForm={formsActions.getForm}
              getSubmissions={formsActions.getFormSubmissions}
            />
          }
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

const getQueryParams = location => qs.parse(location.search, { ignoreQueryPrefix: true });

export default App;
