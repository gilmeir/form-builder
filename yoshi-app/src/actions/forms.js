import axios from 'axios';

const extractData = response => response.data;

const saveForm = formFields => axios.post('/api/forms/', formFields).then(extractData);

const getForms = () => axios.get('/api/forms').then(extractData);

export {
  saveForm,
  getForms,
}
