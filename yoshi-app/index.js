const express = require('express');
const session = require('express-session');
const renderVM = require('./vm');

const app = express();

const forms = [
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

// Register an express middleware. Learn more: http://expressjs.com/en/guide/using-middleware.html.
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.post('/api/forms', (req, res) => {
  forms.push(req.body);
  res.sendStatus(200);
});

app.get('/api/forms', (req, res) => {
  setTimeout(() => res.json(forms), 1000);
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
