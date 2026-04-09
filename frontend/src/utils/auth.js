export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Função utilitária que chama fetch com configuração padrão
const makeRequest = (url, method = "GET", body = null, token = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Se houver token, adiciona o header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// Registrar usuário
export const register = (email, password) => {
  return makeRequest(`${BASE_URL}/signup`, "POST", { email, password });
};

// Fazer login (retorna token)
export const login = (email, password) => {
  return makeRequest(`${BASE_URL}/signin`, "POST", { email, password });
};

// Verificar token e pegar dados do utilizador
export const checkToken = (token) => {
  return makeRequest(`${BASE_URL}/users/me`, "GET", null, token);
};
