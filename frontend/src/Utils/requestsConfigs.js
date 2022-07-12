const baseUrl = 'https://academiaback.herokuapp.com/api/v1';

export const requestConfigLogin = data => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/login`,
    body: { ...data },
  };
};

export const requestConfigRegister = data => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/register`,
    body: { ...data },
  };
};

export const requestConfigPlans = () => {
  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/plans`,
  };
};

export const requestConfigGangs = () => {
  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/gangs`,
  };
};