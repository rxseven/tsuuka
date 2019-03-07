/* eslint-disable import/prefer-default-export */

// Generate random key
function genKey() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

// Generate plural word
function pluralWord(validator, singular, plural = `${singular}s`) {
  return validator > 1 ? plural : singular;
}

export { genKey, pluralWord };
