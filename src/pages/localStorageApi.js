export const getItemToken = () => window.localStorage.getItem('token');
export const setToken = (value) => (
  window.localStorage.setItem('token', value)
);
