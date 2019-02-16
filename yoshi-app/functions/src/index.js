const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');

admin.initializeApp();

const app = express();
app.use(cors());

const forms = {
  1: {
    id: 1,
    name: 'First form',
    fields: [
      {
        name: 'first name',
        label: 'first label',
        type: 'text',
      }
    ]
  }
};

const submissions = {
  1: {
    formId: 1,
    values: {
      'first name': 'john',
      'last name': 'doe',
    }
  },
  2: {
    formId: 1,
    values: {
      'first name': 'gil',
      'last name': 'meir',
    }
  }
};

app.get('/forms', (req, res) => {
  setTimeout(() => {
    const formsSummary = Object.keys(forms).reduce(
      (acc, formId) => {
        const form = forms[formId];
        return [
          ...acc,
          {
            ...form,
            numSubmissions: getFormSubmissions(form.id.toString()).length,
          },
        ]
      }, []
    );
    res.json(formsSummary);
  }, 1000);
});

app.post('/forms', (req, res) => {
  forms.push(req.body);
  res.sendStatus(200);
});

app.get('/forms/:id', (req, res) => {
  setTimeout(() => res.json(forms[req.params.id.toString()]), 1000);
});

app.post('/submit/:id', (req, res) => {
  const formId = parseInt(req.params.id);
  const nextId = Math.max(...Object.keys(submissions)) + 1;
  submissions[nextId] = {
    formId,
    values: req.body,
  };
  res.sendStatus(200);
});

app.get('/submissions', (req, res) => {
  console.log({submissions: req.query});
  setTimeout(() => res.json(getFormSubmissions(req.query.formId)), 1000);
});


const getFormSubmissions = formId => {
  return Object.keys(submissions)
    .map(id => submissions[id])
    .filter(submission => submission.formId.toString() === formId.toString());
};

const api = functions.https.onRequest(app);

module.exports = {
  api,
};

