import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from 'wix-style-react/Table';
import Box from 'wix-style-react/Box';
import Loader from 'wix-style-react/Loader';
import EmptyState from 'wix-style-react/EmptyState';
import Button from 'wix-style-react/Button';

class FormSubmissions extends React.Component {
  state = {
    submissions: [],
    error: undefined,
    loading: false,
    dataLoaded: false,
  };

  componentDidMount() {
    const {
      getSubmissions,
      formId,
    } = this.props;

    formId && getSubmissions(formId)
      .then(submissions => this.setState({
        submissions,
        loading: false,
        dataLoaded: true,
      }))
      .catch(() => this.setState({
        error: 'Failed retrieving your forms',
        loading: false,
      }));
    this.setState({loading: true});
  }

  render() {
    const {
      submissions,
      loading,
      dataLoaded,
      error,
    } = this.state;

    return (
      <Box
        align="center"
        margin="50px"
        direction="vertical"
      >
        {
          (loading || error)
          ? <Loader
              status={error ? 'error' : 'loading'}
              text={error ? 'Failed loading your forms' : 'Loading your forms'}
            />
          : (dataLoaded && submissions.length > 0)
            ? <Table
                data={submissions}
                itemsPerPage={20}
                columns={generateColumns(submissions[0].values)}
              />
            : <EmptyState
                title={`There are no submissions yet for this form`}
              >
                <span style={{marginTop: 25}}>
                  <Link to="/list" style={{textDecoration: 'none'}}>
                    <Button>
                      Back
                    </Button>
                  </Link>
                </span>
              </EmptyState>

        }
      </Box>
   );
  }
}

const generateColumns = submission => Object.keys(submission).map(fieldName => ({
  title: fieldName,
  align: 'center',
  render: row => row.values[fieldName],
}));

FormSubmissions.propTypes = {
  formId: propTypes.string,
  getSubmissions: propTypes.func,
};

export default FormSubmissions;
