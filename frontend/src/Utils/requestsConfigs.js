const baseUrl = 'https://academiaback.herokuapp.com/api/v1';

export const requestConfigLogin = data => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/common/login`,
    body: { ...data },
  };
};

export const requestConfigRegister = (token, data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/secretary/user`,
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

export const requestConfigConfirmExam = (token, data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    body: data,
    url: `${baseUrl}/doctor/`,
  };
};

export const requestConfigTraining = token => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/client/training`,
  };
};

export const requestConfigExam = token => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/client/exam`,
  };
};

export const requestConfigRegistrations = token => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    url: `${baseUrl}/client/registration`,
  };
};