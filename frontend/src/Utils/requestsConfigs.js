const baseUrl = 'https://academiaback.herokuapp.com/api/v1';

export const requestConfigLogin = data => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/common/login`,
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
    url: `${baseUrl}/common/schemes`,
  };
};

export const requestConfigClasses = token => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/secretary/classes`,
  };
};

export const requestConfigMatriculation = data => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/matriculation`,
    body: { ...data },
  };
};

export const requestConfigExercises = token => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/teacher/exercises`,
  };
};

export const requestConfigConfirmExercises = (token, data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    body: data,
    url: `${baseUrl}/teacher/training`,
  };
};