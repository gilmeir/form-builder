const express = require('express');
const bodyParser = require('body-parser');
const renderVM = require('./vm');

const app = express();
app.use(bodyParser.json());

const forms = {
  "1": {
    name: 'First form',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
      }
    ]
  }
};

const submissions = {
  "1": {
    formId: "1",
    values: {
      'firstName': 'john',
      'lastName': 'doe',
    }
  },
  "2": {
    formId: "1",
    values: {
      'firstName': 'jim',
      'lastName': 'smith',
    }
  }
};

const getFormSubmissions = formId => {
  return Object.values(submissions).filter(submission => submission.formId === formId);
};

app.post('/api/forms', (req, res) => {
  const nextId = Math.max(...Object.keys(forms).map(parseInt)) + 1;
  forms[nextId.toString()] = req.body;
  res.sendStatus(200);
});

app.get('/api/forms', (req, res) => {
  setTimeout(() => {
    const formsSummary = Object.entries(forms).reduce(
      (totalForms, [formId, form]) => {
        const newForm = {
          name: form.name,
          id: formId,
          numSubmissions: getFormSubmissions(formId).length,
        };
        return [
          ...totalForms,
          newForm,
        ]
      }, []
    );
    res.json(formsSummary);
  }, 500);
});

app.get('/api/forms/:id', (req, res) => {
  setTimeout(() => res.json(forms[req.params.id.toString()]), 500);
});

app.post('/api/submit/:id', (req, res) => {
  const formId = req.params.id;
  const nextId = Math.max(...Object.keys(submissions).map(parseInt)) + 1;
  submissions[nextId.toString()] = {
    formId,
    values: req.body,
  };
  res.sendStatus(200);
});

app.get('/api/submissions', (req, res) => {
  console.log({submissions: req.query});
  setTimeout(() => res.json(getFormSubmissions(req.query.formId)), 500);
});

// Define a route to render our initial HTML.
app.use('/', (req, res) => {
  const html = renderVM();
  res.send(html);
});

// Launch the server
app.listen(process.env.PORT, () => {
  console.info(`Fake server is running on port ${process.env.PORT}`);
});
