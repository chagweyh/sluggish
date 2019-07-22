export function getLocalStorageValue(key) {
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function validateForm(form, schema) {
  try {
    await schema.validate(form, { abortEarly: false });
  } catch (errors) {
    return errors.inner.map((error) => error.message);
  }
}
