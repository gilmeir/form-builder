/*
const onCaptchaLoadFunctionName = '__onCaptchaLoad__';
const captchaElementId = '__captchaId__';

const loadCaptcha = onLoad => new Promise((resolve, reject) => {
  window[onCaptchaLoadFunctionName] = onLoad;

  const script = document.createElement('script');
  document.body.appendChild(script);
  script.async = true;
  script.src = `https://www.google.com/recaptcha/api.js?onload=${onCaptchaLoadFunctionName}&render=explicit`;
  src.id = captchaElementId;
});

const removeCaptchaScript = () => {
  document.removeChild(document.getElementById(captchaElementId));
};
*/

const captchaSiteKey = '6LfFipQUAAAAAE483JrwaCAypojXo90FQvMM9r3P';

export {
  //loadCaptcha,
  //removeCaptchaScript,
  captchaSiteKey,
}
