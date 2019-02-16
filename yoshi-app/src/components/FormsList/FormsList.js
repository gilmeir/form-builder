import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'wix-style-react/Table';
import Loader from 'wix-style-react/Loader';
import Box from 'wix-style-react/Box';
import { formSubmitUrl, formSubmissionsUrl } from '../../routes/routes';

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
      <Box
        align="center"
        margin="50px"
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
    )
  }
}

const columns = [
  {
    title: 'Form Id',
    align: 'center',
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
    render: row => <Link to={formSubmitUrl(row.id)}>View</Link>,
  },
  {
    title: 'Submissions Page',
    align: 'center',
    render: row => <Link to={formSubmissionsUrl(row.id)}>View</Link>,
  },
];

export default FormsList;
