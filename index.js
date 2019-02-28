const express = require('express');
const bodyParser = require('body-parser');
const renderVM = require('./vm');
const axios = require('axios');
const qs = require('qs');

const app = express();
app.use(bodyParser.json());

const forms = {
  "1": {
    name: 'First form',
    useCaptcha: true,
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
  },
  "2": {
    name: 'Second form without captcha',
    useCaptcha: false,
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

const validateCaptchaIfRequired = (formId, captchaToken) => {
  const form = forms[formId];

  if (form.useCaptcha) {
    const requestBody = {
      secret: process.env.CAPTCHA_SERVER_KEY,
      response: captchaToken,
    };

    const options = {
      method: 'POST',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      data: qs.stringify(requestBody),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    return axios(options).then(response => {
      if (response.data.success !== true) {
        throw new Error(`captcha verification failed: ${JSON.stringify(response.data['error-codes'])}`);
      }
    });
  } else {
    return Promise.resolve();
  }
};


// --------------------   ROUTES   -------------------------- //

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
          useCaptcha: form.useCaptcha,
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

app.post('/api/submit/:id', async (req, res) => {
  const formId = req.params.id;
  const captchaToken = req.body.captchaToken;

  await validateCaptchaIfRequired(formId, captchaToken);

  const nextId = Math.max(...Object.keys(submissions).map(parseInt)) + 1;
  submissions[nextId.toString()] = {
    formId,
    values: req.body.fields,
  };
  res.sendStatus(200);
});

app.get('/api/submissions', (req, res) => {
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
