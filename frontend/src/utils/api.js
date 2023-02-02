const jwt = localStorage.getItem('jwt')

const settingUserApi = {
  baseUrl: "https://api.mestoforyou.nomoredomainsclub.ru",
  headers: {
    authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getServerInfo(path) {
    return this._request(`${this._url}${path}`, {headers: this._headers})
  };

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.removeServerLike(id);
    } else {
      return this.setServerLike(id);
    }

  }

  editServerProfileInfo(data, path) {
    return this._request(`${this._url}${path}`, {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        name: data.name, about: data.about,
      })
    })
  };

  addServerCard(data, path) {
    return this._request(`${this._url}${path}`, {
      method: "POST", headers: this._headers, body: JSON.stringify({
        name: data.name, link: data.link,
      })
    })
  };

  deleteServerCard(id, path) {
    return this._request(`${this._url}${path}/${id}`, {
      method: "DELETE", headers: this._headers,
    })
  };

  setServerLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT", headers: this._headers,
    })
  }

  removeServerLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE", headers: this._headers,
    })
  }

  setServerAvatar(data, path) {
    return this._request(`${this._url}${path}/avatar`, {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
  }
}

export const api = new Api(settingUserApi)
