import React from 'react';
import Table from 'wix-style-react/Table';
import { Link } from 'react-router-dom';
import { formSubmitUrl, formSubmissionsUrl } from '../../routes/routes';

const FormsList = () => (
  <div>
    <Table
      data={tableData}
      itemsPerPage={20}
      columns={columns}
    />
  </div>
);

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

const tableData = [
  {
    id: 1,
    name: 'Task Feedback',
    numSubmissions: 0,
  },
  {
    id: 2,
    name: 'Job Application',
    numSubmissions: 152,
  },
];

export default FormsList;
