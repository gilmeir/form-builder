# Simple Form Builder

### Development

Install dependencies:
```bash
npm i
```

Run frontend with mock server:
```bash
npm start
```


### Production
Hosted on Firebase: https://form-builder-gil.firebaseapp.com

Make sure to [setup a firebase project](https://firebase.google.com/docs/cli/) before deploying.

Edit `firebase-config.js` with your firebase project details.
```bash
npm run firebase-deploy
```

## Project Structure
Components:
- Frontend: `src/`
  - Yoshi based project
- Backend code: `functions/`
  - An express app
- Storage: Firestore database
  - Two collections are used:
    - forms
    - submissions
