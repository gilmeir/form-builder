import axios from 'axios';

const extractData = response => response.data;

const saveForm = formFields => axios.post('/api/forms/', formFields).then(extractData);
const getForms = () => axios.get('/api/forms').then(extractData);
const getFormFields = formId => axios.get(`/api/forms/${formId}`).then(extractData);

const submitForm = (formId, formFields) => axios.post(`/api/submit/${formId}`, formFields).then(extractData);

export {
  saveForm,
  getForms,
  submitForm,
  getFormFields,
}
