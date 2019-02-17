const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');

//const serviceAccountKey = require("./service-account-key.json");


/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://yoshi-app-8172c.firebaseio.com"
})*/

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const formsCollection = firestore.collection('forms');
const submissionsCollection = firestore.collection('submissions');

const app = express();
app.use(cors());

app.get('/forms', async (req, res) => {
  let formsData = {};
  const formsSnapshot = await formsCollection.get();
  formsSnapshot.forEach(doc => {
    formsData[doc.id] = {
      id: doc.id,
      ...doc.data(),
      numSubmissions: 0,
    };
  });

  const submissionsSnapshot = await submissionsCollection.get();
  submissionsSnapshot.forEach(doc => {
    const docData = doc.data();
    formsData[docData.formId].numSubmissions++;
  });

  const response = Object.keys(formsData).map(id => formsData[id]);
  res.json(response);
});

app.post('/forms', async (req, res) => {
  const formData = req.body;
  await formsCollection.add(formData);
  res.sendStatus(200);
});

app.get('/forms/:id', async (req, res) => {
  const formId = req.params.id;

  const formsData = [];
  const formsSnapshot = await formsCollection.get(formId);
  formsSnapshot.forEach(doc => {
    const docData = doc.data();
    formsData.push(docData);
  });

  if (formsData.length === 1) {
    res.json(formsData[0])
  } else {
    res.sendStatus(404);
  }
});

app.post('/submit/:id', async (req, res) => {
  const formId = req.params.id;
  const values = req.body;

  await submissionsCollection.add({
    formId,
    values,
  });

  res.sendStatus(200);
});

app.get('/submissions', async (req, res) => {
  const formId = req.query.formId;

  const submissions = [];
  const submissionsSnapshot = await submissionsCollection.where('formId', '==', formId).get();
  submissionsSnapshot.forEach(doc => {
    const docData = doc.data();
    const docId = doc.id;

    submissions.push({
      id: docId,
      values: docData.values,
    });
  });

  res.json(submissions);
});

const api = functions.https.onRequest(app);

module.exports = {
  api,
};

