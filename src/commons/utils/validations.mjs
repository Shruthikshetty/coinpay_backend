// this is used to validate pan

export function validatePan(value) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  return panRegex.test(value);
}
