export const getItemToken = () => localStorage.getItem('token');
export const setToken = (value) => (
  localStorage.setItem('token', value)
);
