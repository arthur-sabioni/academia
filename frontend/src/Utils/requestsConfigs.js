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
    url: `${baseUrl}/common/schemes`,
  };
};

export const requestConfigClasses = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiQ1BGIjoiOTI2LjQ0MC44MzYtMzAiLCJ0eXBlIjoic2VjcmV0YXJ5IiwiaWF0IjoxNjU3MzEyODg5fQ.Yx8eEonyAZhbm7aAgKWF0Q6lIS36Wr05pqnseqtBWMg`
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

export const requestConfigExercises = (token) => {
  return {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json; charset=UTF-8', 
    'Authorization': `Bearer ${token}`
   },
    url: `${baseUrl}/teacher/exercises`,
  };
};

export const requestConfigConfirmExercises = (data) => {
  return {
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json; charset=UTF-8'
   },
    body: data,
    url: `${baseUrl}/teacher/training`,
  };
};