import React from 'react';
import Loader from 'wix-style-react/Loader';
import Box from 'wix-style-react/Box';
import Card from 'wix-style-react/Card';
import Form from '../Form/Form';
import styles from './FormSubmit.scss';
import * as routes from '../../routes/routes';

class FormSubmit extends React.Component {
  state = {
    formId: 0,
    name: '',
    fields: [],
    error: false,
    loading: false,
    submitted: false,
  };

  componentDidMount() {
    const {
      formId,
      getFormFields,
    } = this.props;

    getFormFields(formId)
      .then(({name, fields}) =>
        this.setState({
          name,
          fields,
          loading: false,
        }))
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );

    this.setState({loading: true});
  }

  handleSubmit(formId, values) {
    const {
      onSubmit,
      redirectTo,
    } = this.props;

    onSubmit(formId, values)
      .then(() => redirectTo(routes.list));
  }

  render() {
    const { formId } = this.props;

    const {
      name,
      fields,
      loading,
      error,
    } = this.state;

    return (
      <Box
        marginTop="25px"
        align="center"
      >
        {
          (loading || error)
            ? <Box marginTop="25px">
                <Loader
                  key="loader"
                  status={error ? 'error' : 'loading'}
                  text={error ? 'Loading failed' : 'Loading the form'}
                />
              </Box>
            : <Card className={styles.formCard} key="card">
                <Card.Header title={name}/>
                <Card.Content>
                  <Form
                    formId={formId}
                    fields={fields}
                    onSubmit={(...args) => this.handleSubmit(...args)}
                  />
                </Card.Content>
              </Card>
        }
      </Box>
    );
  }
}

export default FormSubmit;
