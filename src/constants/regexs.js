const REGEXS = Object.freeze({
  number: /^[0-9]+$/,
  specialCharacter: /[!@#$%^&*()_+{}[\]<>.?~\\=]/g,
  commaAndOptionalSpace: /\,\s*/,
});

export default REGEXS;
