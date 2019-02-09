import React from 'react';
import { Table}  from 'wix-style-react/dist/src/Table';

const FormsList = ({forms}) => (
  <Table
    data={generateRows(forms)}
    itemsPerPage={20}
    columns={tableColumns}
  >
    forms.length > 0
     ? <Table.Content/>
     : <Table.EmptyState/>
  </Table>
);

const generateRows = forms => forms
  .map(form => ({
    ...form,

  }))
  .sort((formA, formB) => (formA.id - formB.id));

const tableColumns = [
  {
    title: 'Form Id',
    sortable: true,
    sortDescending: false,
  },
  {
    title: 'Form Name',
  },
  {
    title: '# Submissions',
  },
  {
    title: 'Submit Page',
    render: rowData => <a href={getSubmitPageUrl(rowData.id)}>View</a>
  },
  {
    title: 'Submissions Page',
    render: rowData => <a href={getSubmissionsUrl(rowData.id)}>View</a>
  },
];

const getSubmitPageUrl = formId => `/forms/${formId}`;

const getSubmissionsUrl = formId => `/submissions/${formId}`;

export default FormsList;
