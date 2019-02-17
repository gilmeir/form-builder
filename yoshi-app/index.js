const express = require('express');
const session = require('express-session');
const renderVM = require('./vm');

const app = express();

const forms = {
  1: {
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

const getFormSubmissions = formId => {
  return Object.values(submissions).filter(submission => submission.formId.toString() === formId.toString());
};

// Register an express middleware. Learn more: http://expressjs.com/en/guide/using-middleware.html.
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.post('/api/forms', (req, res) => {
  const nextId = Math.max(...Object.keys(forms)) + 1;
  forms[nextId] = req.body;
  res.sendStatus(200);
});

app.get('/api/forms', (req, res) => {
  setTimeout(() => {
    const formsSummary = Object.keys(forms).reduce(
      (acc, formId) => ([
        ...acc,
        {
          ...forms[formId],
          id: formId,
          numSubmissions: getFormSubmissions(formId).length,
        },
      ]), []
    );
    res.json(formsSummary);
  }, 1000);
});

app.get('/api/forms/:id', (req, res) => {
  setTimeout(() => res.json(forms[req.params.id.toString()]), 1000);
});

app.post('/api/submit/:id', (req, res) => {
  const formId = parseInt(req.params.id);
  const nextId = Math.max(...Object.keys(submissions)) + 1;
  submissions[nextId] = {
    formId,
    values: req.body,
  };
  res.sendStatus(200);
});

app.get('/api/submissions', (req, res) => {
  console.log({submissions: req.query});
  setTimeout(() => res.json(getFormSubmissions(req.query.formId)), 1000);
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
