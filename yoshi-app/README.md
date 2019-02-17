# Simple Form Builder

### Development

Install dependencies:
```bash
npm i
```


Run:
```bash
npm start
```
The server mocks the database layer with in-memory objects/arrays.
\  
### Production


Hosted on Firebase: https://yoshi-app-8172c.firebaseapp.com

Components:
- Frontend: `src/`
  - Yoshi based project
- Backend code: `functions/`
  - An express app
- Storage: Firestore database setup within the project
  - Two collections are used:
    - forms
    - submissions

Deploy:

Make sure to [setup a firebase project](https://firebase.google.com/docs/cli/) before deploying.

Run:
```bash
npm run firebase-deploy
```
