const baseUrl = 'https://backendpizzaria.herokuapp.com/api/v1';

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
  const { name, cpf, email, phone, password } = data;
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    url: `${baseUrl}/cliente/novo`,
    body: {
      nome: name,
      cpf: cpf,
      email: email,
      telefone: phone,
      senha: password,
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