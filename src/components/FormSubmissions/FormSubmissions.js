import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from 'wix-style-react/Table';
import Box from 'wix-style-react/Box';
import Loader from 'wix-style-react/Loader';
import EmptyState from 'wix-style-react/EmptyState';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import * as routes from '../../routes/routes';

class FormSubmissions extends React.Component {
  state = {
    submissions: [],
    form: {},
    error: undefined,
    loading: false,
    dataLoaded: false,
  };

  componentDidMount() {
    const {
      getSubmissions,
      getForm,
      formId,
    } = this.props;

    formId &&
      Promise.all([
        getSubmissions(formId),
        getForm(formId),
      ])
      .then(([submissions, form]) => this.setState({
        submissions,
        loading: false,
        dataLoaded: true,
        form,
      }))
      .catch(() => this.setState({
        error: 'Failed retrieving your forms',
        loading: false,
      }));

    this.setState({loading: true});
  }

  renderCard() {
    const {
      submissions,
      dataLoaded,
      form,
    } = this.state;

    const {
      name,
      fields,
    } = form;

    return (
      <Card>
        <Card.Header title={`Submissions for '${name}'`}/>
        <Card.Content>
          {
            (dataLoaded && submissions.length > 0)
              ? <Table
                  data={submissions}
                  itemsPerPage={20}
                  columns={generateColumns(fields)}
                />
              : <EmptyState title={`There are no submissions yet for this form`} />
          }
        </Card.Content>
      </Card>
    );
  }

  render() {
    const {
      loading,
      error,
    } = this.state;

    return (
      <Box
        align="center"
        direction="vertical"
      >
        {
          (loading || error)
          ? <Box marginTop="25px">
              <Loader
                status={error ? 'error' : 'loading'}
                text={error ? 'Failed loading the form submissions' : 'Loading submissions'}
              />
            </Box>
          : this.renderCard()
        }
        {
          !loading && (
            <span style={{marginTop: 25}}>
              <Link to={routes.list} style={{textDecoration: 'none'}}>
                <Button>
                  Back
                </Button>
              </Link>
            </span>
          )
        }
      </Box>
   );
  }
}

const generateColumns = formFields => formFields.map(({name}) => ({
  title: name,
  align: 'center',
  render: row => row.values[name],
}));

FormSubmissions.propTypes = {
  formId: propTypes.string.isRequired,
  getForm: propTypes.func.isRequired,
  getSubmissions: propTypes.func.isRequired,
};

export default FormSubmissions;
