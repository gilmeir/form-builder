import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from 'wix-style-react/Table';
import Loader from 'wix-style-react/Loader';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import Add from 'wix-style-react/new-icons/Add';
import * as routes from '../../routes/routes';

class FormsList extends React.Component {
  state = {
    forms: [],
    error: undefined,
    loading: false,
  };

  componentDidMount() {
    const { getForms } = this.props;

    getForms()
      .then(forms => this.setState({
        forms,
        loading: false,
      }))
      .catch(() => this.setState({
        error: 'Failed retrieving your forms',
        loading: false,
      }));
    this.setState({loading: true});
  }

  render() {
    const {
      forms,
      error,
      loading,
    } = this.state;

    return (
      <Card>
        <Card.Header
          title="My Forms"
          suffix={
            <Link to={routes.builder} style={{textDecoration: 'none'}}>
              <Button
                size="medium"
                prefixIcon={<Add />}
              >
                New Form
              </Button>
            </Link>
          }
        />
        <Card.Content>
          <Box
            align="center"
            direction="vertical"
          >
            <Box>
              <Table
                data={forms}
                itemsPerPage={20}
                columns={columns}
                showHeaderWhenEmpty
              />
            </Box>

            {
              (loading || error) &&
              <Box marginTop="25px">
                <Loader
                  status={error ? 'error' : 'loading'}
                  text={error ? 'Failed loading your forms' : 'Loading your forms'}
                />
              </Box>
            }
          </Box>
        </Card.Content>
      </Card>
    )
  }
}

const columns = [
  {
    title: 'Form Id',
    align: 'center',
    width: '150px',
    render: row => row.id,
  },
  {
    title: 'Form Name',
    align: 'center',
    render: row => row.name,
  },
  {
    title: '# Submissions',
    align: 'center',
    render: row => row.numSubmissions,
  },
  {
    title: 'Submit Page',
    align: 'center',
    render: row => <Link to={routes.formSubmitUrl(row.id)}>View</Link>,
  },
  {
    title: 'Submissions Page',
    align: 'center',
    render: row => <Link to={routes.formSubmissionsUrl(row.id)}>View</Link>,
  },
];

FormsList.propTypes = {
  getForms: propTypes.func,
};

export default FormsList;
