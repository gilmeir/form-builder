# Simple Form Builder

### Development

Install dependencies:
- once for `simple-form-builder` (frontend)
- and again in `simple-form-builder/functions` within it (backend)
```bash
npm i
```

Run the frontend app only (with mock server):
```bash
npm start
```

Run locally on firebase context - both frontend & backend:
```bash
npm run firebase-serve
```
* it builds both projects before serving

### Production
Hosted on Firebase: https://form-builder-gil.firebaseapp.com

Make sure to [setup a firebase project](https://firebase.google.com/docs/cli/) before deploying.

Edit `firebase-config.js` with your firebase project details.
```bash
npm run firebase-deploy
```
* it builds both projects before serving

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
