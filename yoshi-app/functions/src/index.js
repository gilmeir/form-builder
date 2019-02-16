const functions = require('firebase-functions');
const admin = require('firebase-admin');
//const app = require('./app');
const express = require('express');

const app = express();

const apiRouter = require('express').Router();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
admin.initializeApp();

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

apiRouter.get('/forms', (req, res) => {
  setTimeout(() => {
    const formsSummary = Object.values(forms).reduce(
      (acc, form) => {
        console.log({apiForm: form});
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

const getFormSubmissions = formId => {
  return Object.values(submissions).filter(submission => submission.formId.toString() === formId.toString());
};

const api = functions.https.onRequest(apiRouter);
//const api = functions.https.onRequest(app);

module.exports = {
  api,
};

