const root = '/';

const list = '/list';

const builder = '/builder';

const submit = '/submit';
const formSubmitUrl = formId => `${submit}/${formId}`;

const submissions = '/submissions';
const formSubmissionsUrl = formId => `${submissions}/${formId}`;

export {
  root,
  list,
  builder,
  formSubmitUrl,
  formSubmissionsUrl,
}
