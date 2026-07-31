class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
    this._accessToken = null; // Armazena o token em memória
  }

  //  Criar o método setAccessToken
  setAccessToken(token) {
    this._accessToken = token;
  }

  //  No método getHeader não pegamos mais do local storage, pega do this._accessToken
  getHeader() {
    return {
      ...this.headers,
      ...(this._accessToken
        ? { Authorization: `Bearer ${this._accessToken}` }
        : {}),
    };
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  async _fetchWithRefresh(url, options) {
    const headers = this.getHeader();
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    return response;
  }



  getInitialCards() {
    return this._fetchWithRefresh(`${this._baseUrl}/cards`, {
      headers: this.getHeader(),
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return this._fetchWithRefresh(`${this._baseUrl}/users/me`, {
      headers: this.getHeader(),
    }).then(this._handleServerResponse);
  }

  setUserAvatar(avatar) {
    return this._fetchWithRefresh(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeader(),
      body: JSON.stringify(avatar),
    }).then(this._handleServerResponse);
  }

  setUserInfo({ name, about }) {
    console.log("serUserInfo")
    return this._fetchWithRefresh(`${this._baseUrl}/users/me`, {
      
      method: "PATCH",
      headers: this.getHeader(),
      body: JSON.stringify({ name, about }),
    }).then(this._handleServerResponse);
  }

  addNewCard({ name, link }) {
    return this._fetchWithRefresh(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({ name, link }),
    }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
    return this._fetchWithRefresh(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.getHeader(),
    }).then(this._handleServerResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return this._fetchWithRefresh(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.getHeader(),
    }).then(this._handleServerResponse);
  }

  /* --- ROTAS PÚBLICAS (NÃO USAM FETCH WITH REFRESH) --- */

  register({ email, password }) {
    return fetch(`${this._baseUrl}/auths/register`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(this._handleServerResponse);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/auths/login`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(this._handleServerResponse);
  }
}

export const api = new Api({
  baseUrl: import.meta.env.VITE_BASE_URL || "https://web-project-api-full-2qtg.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});