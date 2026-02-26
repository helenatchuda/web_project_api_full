class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
    // corpo do construtor
  }
  async _fetchWithRefresh(url, options) {
    const response = await fetch(url, options);

    if (response.status !== 401) {
      return response;
    }

    const refreshReponse = await this.refresh();
    this.setAccessToken(refreshReponse.token);

    options.headers = this._getHeaders();
    return fetch(url, options);
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(avatar),
    }).then(this._handleServerResponse);
  }

 addNewCard({ name, link }) {
  return this._fetchWithRefresh(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this.getHeader(), 
    body: JSON.stringify({ name, link }),
  }).then(this._handleServerResponse);
}

  //PATCH https://around-api.pt-br.tripleten-services.com/v1/users/me
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleServerResponse);
  }

  getHeader() {
    console.log("getHeader",localStorage)
    const token = localStorage.getItem("token");
    let authHeaders = {};
    if (token) {
      authHeaders = {
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      ...this.headers,
      ...authHeaders,
    };
  }
  register({ email, password }) {
    return fetch(`${this._baseUrl}/auths/register`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleServerResponse);
  }
  login({ email, password }) {
    return fetch(`${this._baseUrl}/auths/login`, { 
      method: "POST",
      headers: this._defaultHeaders,
      body: JSON.stringify({ email, password }),
    }).then(this._handleServerResponse);
  }

  logout() {
    return this._fetchWithRefresh(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._getHeaders(),
      credentials: "include",
    }).then(this._handleServerResponse);
  }
  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/auths/register`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleServerResponse);
  }
  refresh() {
    return fetch(`${this._baseUrl}/auths/refresh`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleServerResponse);
  }

  //GET https://around-api.pt-br.tripleten-services.com/v1/users/me
  getUserInfo() {
    console.log("getHeader",localStorage)
    return this._fetchWithRefresh(`${this._baseUrl}/users/me`, {
      headers: this.getHeader(),
      credentials: "include",
    }).then(this._handleServerResponse);
  }
  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._getHeader(),
      method: like ? "PUT" : "DELETE",
    }).then(this._handleServerResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})