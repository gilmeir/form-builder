import axios from 'axios';

const baseURL = window.__SERVER_BASE_URL__;
const backend = axios.create({baseURL});

const extractData = response => response.data;

const saveForm = formData => backend.post('/api/forms/', formData).then(extractData);
const getForms = () => backend.get('/api/forms').then(extractData);
const getForm = formId => backend.get(`/api/forms/${formId}`).then(extractData);

const submitForm = (formId, formFields) => backend.post(`/api/submit/${formId}`, formFields).then(extractData);

const getFormSubmissions = formId => backend.get(`/api/submissions?formId=${formId}`).then(extractData);

export {
  saveForm,
  getForms,
  submitForm,
  getForm,
  getFormSubmissions,
}
