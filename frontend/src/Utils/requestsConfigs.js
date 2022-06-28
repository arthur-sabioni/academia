const baseUrl = 'https://backendacademia.herokuapp.com/api/v1';

export const requestConfigLogin = data => {
  const { email, password } = data;
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/cliente/login`,
    body: {
      email: email,
      senha: password,
    },
  };
};

export const requestConfigRegister = data => {
  const { name, cpf, rg, birth, email, phone } = data;
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/cliente/novo`,
    body: {
      name: name,
      cpf: cpf,
      rg: rg,
      birth: birth,
      email: email,
      phone: phone,
    },
  };
};

export const requestConfigPlans = () => {
  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/plans`,
  };
};