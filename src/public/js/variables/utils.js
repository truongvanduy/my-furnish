const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const convertFlashMessage = (obj) => {
  const type = Object.keys(obj)[0];
  const title = type;
  const message = obj[type];
  const duration = 3000;
  return { title, message, type, duration };
};

export { $, $$, convertFlashMessage };
